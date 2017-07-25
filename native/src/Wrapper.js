import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Route } from 'react-router-native';
import { QueryRenderer } from 'react-relay';
import environment from './relay/environment';
import WrapperQuery from './queries/Wrapper';
import Header from './Header';
import Home from './routes/Home';
import HomeQuery from './queries/Home';
import Single from './routes/Single';
import SingleQuery from './queries/Single';
import Date from './routes/Date';
import DateQuery from './queries/Date';
import Term from './routes/Term';
import TermQuery from './queries/Term';
import Error from './Error';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
});

const renderProp = (RenderComponent, query, prepareVariables = null) => routeProps => {
  const variables = prepareVariables ? prepareVariables(routeProps.match) : {};
  return (
    <QueryRenderer
      {...{ query, variables }}
      environment={environment}
      render={({ error, props }) => {
        if (error) {
          return <Error error={error} />;
        }

        if (!props) {
          return (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          );
        }

        return <RenderComponent {...routeProps} {...props} />;
      }}
    />
  );
};

/* eslint-disable react/prop-types */

export default () =>
  <QueryRenderer
    environment={environment}
    query={WrapperQuery}
    variables={{
      menuID: 'TmF2TWVudToy',
    }}
    render={({ error, props }) => {
      if (error) {
        return <Error error={error} />;
      }

      if (!props) {
        return <ActivityIndicator size="large" color="#000" />;
      }

      const { settings, navMenu } = props.viewer;

      return (
        <View style={styles.container}>
          <Header {...{ settings, navMenu }} />
          <Route exact path="/" render={renderProp(Home, HomeQuery)} />
          <Route
            path="/music/:slug"
            render={renderProp(Term, TermQuery, ({ params }) => ({
              ...params,
              taxonomy: 'category',
            }))}
          />
          <Route
            path="/tag/:slug"
            render={renderProp(Term, TermQuery, ({ params }) => ({
              ...params,
              taxonomy: 'tag',
            }))}
          />
          <Route
            path="/:year(\d+)/:month(\d+)/:day(\d+)/:id"
            render={renderProp(Single, SingleQuery, ({ params: { id } }) => ({
              id,
            }))}
          />
          <Route
            path=":year(\d+)/:month(\d+)?/:day(\d+)?"
            render={renderProp(Date, DateQuery, params => {
              const vars = Object.assign({}, params);
              return ['year', 'month', 'day'].reduce((memo, value) => {
                if (vars[value]) {
                  memo[value] = parseInt(vars[value], 10);
                }
                return memo;
              }, {});
            })}
          />
        </View>
      );
    }}
  />;

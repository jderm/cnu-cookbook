import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeList from '../components/RecipeList/RecipeList';
import { fetchRecipes } from '../components/RecipeList/actions';

class RecipeListPage extends Component {
  componentWillMount() {
    this.props.fetchRecipes();
  }

  render() {
    const { recipesFromRedux, isFetching } = this.props;

    if (isFetching) {
      return (
        <div>
          Loading...{' '}
          <i className="fa fa-spin fa-spinner" />
        </div>
      );
    }

    return <RecipeList recipes={recipesFromRedux} />;
  }
}

const mapReduxStoreToProps = reduxStore => {
  return {
    recipesFromRedux: reduxStore.recipeList.recipes,
    isFetching: reduxStore.recipeList.isFetching,
  };
};

const mapActionsToProps = {
  fetchRecipes,
};

export default connect(
  mapReduxStoreToProps,
  mapActionsToProps,
)(RecipeListPage);

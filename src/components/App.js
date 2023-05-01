import React from "react";
import SearchBar from "./SearchBar";
import Profile from "./Profile";

/* This is a React component that allows users to search for a GitHub user and displays their profile
and repositories. */
class App extends React.Component {
  /**
   * This is a constructor function that initialises the state of a component with searchUser, user,
   * and repos properties. Using state is necessary for detecting the change in the searchUser,
   * user and repos properties.
   */
  constructor(props) {
    super(props);
    this.state = {
      searchUser: "",
      user: null,
      repos: [],
    };
  }

  // This code is handling the search functionality for a GitHub user.
  handleSearch = async () => {
    const API_URL = "https://api.github.com/users/";

    try {
      /* It first checks if there is a
      search query entered by the user, and if not, it returns without doing anything.*/
      if (!this.state.searchUser) return;

      /*If there is a search query, the code sends a GET request to the GitHub API using the search
      query as a parameter using fetch and await. If the user is found, it sets the user state to the response data.
      */
      const usrResponse = await fetch(API_URL + this.state.searchUser);
      const user = await usrResponse.json();

      /* This code is checking if the response from the GitHub API contains a `message` property with
      the value of `'Not Found'`. If it does, it means that the user specified in the search query
      was not found, so it sets the `user` state to `null` and displays an alert message to the
      user. If the user is found, it sets the `user` state to the response data. */
      if (user.message === "Not Found") {
        this.setState({ user: null });
        alert("User not found");
      } else {
        this.setState({ user });
      }

      /* This code is sending a GET request to the GitHub API to retrieve the repositories of the user
      specified in the search query. It uses the `fetch` function to send the request and `await` to
      wait for the response. If the request is successful, it sets the `repos` state to the response
      data. If the repos is not an array, then the repos states will be set to [] */
      const repoResponse = await fetch(
        API_URL + this.state.searchUser + "/repos?sort=created"
      );
      const repos = await repoResponse.json();

      /* This code is checking if the `repos` variable is an array. If it is an array, it sets the
    `repos` state to the response data. If it is not an array, it logs an error message to the
    console and sets the `repos` state to an empty array. This is necessary to handle cases where
    the response from the GitHub API is not in the expected format, and to prevent the application
    from crashing due to unexpected data. */
      if (Array.isArray(repos)) {
        this.setState({ repos });
      } else {
        console.error("Error fetching repos:", repos);
        this.setState({ repos: [] });
      }
    } catch (error) {
      console.error(error);
      this.setState({ repos: [] });
    }
  };

  /* `setSearchUser` is a function that is used to update the `searchUser` property in the component's
  state. It takes a parameter `value` which is the new value for `searchUser`. When `setSearchUser`
  is called, it uses the `setState` method to update the `searchUser` property in the component's
  state with the new value. This is necessary for detecting changes in the search query entered by
  the user and triggering a new search when the user clicks the search button. */
  setSearchUser = (value) => {
    this.setState({ searchUser: value });
  };

  /* `render()` is a method in a React component that returns the JSX code to be rendered on the
  screen. In this case, the `render()` method is returning a `div` element that contains two child
  components: `SearchBar` and `Profile`. */
  render() {
    return (
      <div>
        <SearchBar
          setSearchUser={this.setSearchUser}
          handleSearch={this.handleSearch}
        />
        <Profile user={this.state.user} repos={this.state.repos} />
      </div>
    );
  }
}
export default App;

import { useState} from "react";
import SearchBar from "./components/SearchBar";
import Profile from "./components/Profile";

const App = () => {
  /* `useState` is a hook in React that allows functional components to have state variables. In this
    code, `const [searchUser, setSearchUser] = useState("")` initialises the `searchUser` state
    variable to an empty string and provides a function `setSearchUser` to update its value.
    Similarly, `const [user, setUser] = useState(null)` initialises the `user` state variable to
    `null` and provides a function `setUser` to update its value. Finally, `const [repos, setRepos]
    = useState([])` initialises the `repos` state variable to an empty array and provides a function
    `setRepos` to update its value. These state variables are used to store and update the user
    input, user data, and repository data respectively. */
  const [searchUser, setSearchUser] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  /**
   * The function handles a search for a user on GitHub and retrieves their information and
   * repositories.
   * The function `handleSearch` is an asynchronous function
   * that fetches data from the GitHub API and updates the state variables `user` and `repos` based
   * on the response.
   */
  const handleSearch = async () => {
    /* `const API_URL = "https://api.github.com/users/";` is defining a constant variable `API_URL`
        that stores the base URL for the GitHub API. */
    const API_URL = "https://api.github.com/users/";

    /* This code block is trying to fetch user data from the GitHub API using the `fetch` function
        and the `searchUser` state variable.*/
    try {
      /* If `searchUser` is empty, the function returns and does
        not execute the rest of the code block.*/
      if (!searchUser) return;

      /* This code block is fetching user data from the GitHub API. It first creates a `usrResponse`
      variable by using the `fetch` function to make a GET request to the GitHub API endpoint for
      the user's information. The `API_URL` variable stores the base URL for the GitHub API, and
      `searchUser` is the username of the user being searched for. The `await` keyword is used to
      wait for the response from the API before continuing with the code execution. Once the
      response is received, the `json()` method is called on the response object to extract the JSON
      data from the response body. The extracted JSON data is then stored in the `user` variable. */
      const usrResponse = await fetch(API_URL + searchUser);
      const user = await usrResponse.json();

      /* If the response from the GitHub API contains a "Not Found"
          message, the code sets the `user` state variable to `null` and displays an alert
          message saying "User not found". If the response does not contain a "Not Found" message,
          the code sets the `user` state variable to the retrieved user data. */
      if (user.message === "Not Found") {
        setUser(null);
        alert("User not found");
      } else {
        setUser(user);
      }

      /* This code block is fetching the repositories of the user whose username is stored in the
      `searchUser` state variable from the GitHub API. It first creates a `repoResponse` variable by
      using the `fetch` function to make a GET request to the GitHub API endpoint for the user's
      repositories. The `API_URL` variable stores the base URL for the GitHub API, and `searchUser`
      is the username of the user being searched for. The `"/repos?sort=created"` string is appended
      to the URL to specify that the API should return the user's repositories sorted by creation
      date. */
      const repoResponse = await fetch(
        API_URL + searchUser + "/repos?sort=created"
      );
      const repos = await repoResponse.json();

      /* This code block is checking if the `repos` variable returned from the GitHub API is an array.
      If it is an array, it sets the `repos` state variable to the retrieved repositories using the
      `setRepos` function. If `repos` is not an array, it logs an error message to the console and
      sets the `repos` state variable to an empty array using the `setRepos` function. This is done
      to handle any errors that may occur when fetching the repositories from the GitHub API. */
      if (Array.isArray(repos)) {
        setRepos(repos);
      } else {
        console.error("Error fetching repos:", repos);
        setRepos([]);
      }
    /* The catch block handles any
    errors that may occur when fetching data. If an error occurs,
    it logs the error message to the console using `console.error(error)` and sets the `repos`
    state variable to an empty array using `setRepos([])`. This is done to prevent the application
    from crashing and to provide a fallback value for the `repos` state variable. */
    } catch (error) {
      console.error(error);
      setRepos([]);
    }
  };

  /* The `return` statement is returning a JSX element that contains two components: `SearchBar` and
  `Profile`. The `SearchBar` component is passed two props: `setSearchUser` and `handleSearch`,
  which are functions used to update the `searchUser` state variable and to handle the search for a
  user on GitHub, respectively. The `Profile` component is passed two props: `user` and `repos`,
  which are state variables used to store and display the user data and repository data,
  respectively. The JSX element is wrapped in a `div` element to group the components together. */
  return (
    <div>
      <SearchBar setSearchUser={setSearchUser} handleSearch={handleSearch} />
      <Profile user={user} repos={repos} />
    </div>
  );
};

export default App;

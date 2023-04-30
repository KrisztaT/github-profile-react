import React from "react";

/**
 * The function takes in a user and their repositories as props and returns a JSX element displaying
 * the user's profile information and a list of their repositories.
 */
const Profile = ({ user, repos }) => {
  return (
    <div className="container">
      {user && (
        <div className="inner-container">
          <img className="avatar" src={user.avatar_url} alt={user.login} />
          <div className="info-card">
            <h1>{user.name}</h1>
            <p>{user.bio}</p>
            <div className="stats">
              <p> {user.followers} Followers </p>
              <p> {user.following} Following </p>
              <p> {user.public_repos} Repos </p>
            </div>
          </div>
        </div>
      )}
      <div className="repos">
        {repos.map((repo) => (
          <a href={repo.html_url}>{repo.name}, </a>
        ))}
      </div>
    </div>
  );
};

export default Profile;

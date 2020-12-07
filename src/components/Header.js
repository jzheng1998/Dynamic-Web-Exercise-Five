import React from "react";

function Header({ loggedIn, Logout }) {
  return (
    <header className="Header">
      <nav>
        {loggedIn ? (
          <>
            <a href="/">User Profile</a>
            <a onClick={() => Logout()}>Logout</a>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/create-account">Create Account</a>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

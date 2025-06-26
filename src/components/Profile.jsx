import { useColor } from "../context/colorContext";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

function Profile() {
  const { darkMode, userId, like } = useColor();
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    avatar: "",
    bio: "",
    phone: "",
    lastLogin: new Date().toLocaleString(),
    smsAlert: true,
  });
  const [editing, setEditing] = useState(false);
  const [reminders, setReminders] = useState(() => {
    if (!userId) return {};
    const data = localStorage.getItem(`reminders_${userId}`);
    return data ? JSON.parse(data) : {};
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;
    const saved = localStorage.getItem(`profile_${userId}`);
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      fetch("https://randomuser.me/api/")
        .then((res) => res.json())
        .then((data) => {
          const avatar = data.results[0].picture.large;
          const name = userId.split("@")[0];
          const newProfile = {
            email: userId,
            name,
            avatar,
            bio: "",
            phone: "",
            lastLogin: new Date().toLocaleString(),
            smsAlert: true,
          };
          setProfile(newProfile);
          localStorage.setItem(`profile_${userId}`, JSON.stringify(newProfile));
        });
    }
  }, [userId]);

  useEffect(() => {
    if (userId && profile.email) {
      localStorage.setItem(`profile_${userId}`, JSON.stringify(profile));
    }
  }, [profile, userId]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      Object.entries(reminders).forEach(([title, time]) => {
        if (Date.now() > time) {
          if (Notification.permission === "granted") {
            new Notification(`Reminder: Watch ${title}`);
          }
          // Remove reminder after firing
          const newReminders = { ...reminders };
          delete newReminders[title];
          setReminders(newReminders);
        }
      });
    }, 60000); // check every minute
    return () => clearInterval(interval);
  }, [reminders, setReminders]);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`reminders_${userId}`, JSON.stringify(reminders));
    }
  }, [reminders, userId]);

  // Reload reminders when userId changes
  useEffect(() => {
    if (userId) {
      const data = localStorage.getItem(`reminders_${userId}`);
      setReminders(data ? JSON.parse(data) : {});
    } else {
      setReminders({});
    }
  }, [userId]);

  if (!userId) {
    return (
      <div className={darkMode ? "darkMode" : "lightMode"}>
        <div className="profile-container"><h2>Please log in to view your profile.</h2></div>
      </div>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  function handleEdit(e) {
    e.preventDefault();
    setEditing(false);
  }

  function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, avatar: imageUrl }));
    }
  }

  function handleSetReminder(movie) {
    const time = window.prompt(
      "Set reminder in minutes (e.g. 60 for 1 hour, 1440 for 1 day):"
    );
    if (time) {
      const remindAt = Date.now() + parseInt(time) * 60000;
      setReminders({ ...reminders, [movie.title]: remindAt });
      alert("Reminder set! You will get a desktop notification.");
    }
  }

  function handleRemoveReminder(title) {
    const newReminders = { ...reminders };
    delete newReminders[title];
    setReminders(newReminders);
  }

  return (
    <div className={darkMode ? "darkMode" : "lightMode"}>
      <div className="dashboard">
        <aside className="sidebar">
          <button className="back-btn" onClick={() => navigate(-1)}>← Go Back</button>
          <div className="logo">nFlix</div>
          <nav>
            <ul>
              <li><Link to="/dashboard">My Dashboard</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/like">Like playList</Link></li>
              <li><Link to="/">Login</Link></li>
              
            </ul>
          </nav>
        </aside>

        <main className="main">
          <header className="top-bar">
            <div>
              <h1>My NavFlix Dashboard</h1>
              <p>Welcome to Navflix movie dashboard</p>
            </div>
            <div className="user-greeting">
              <img src={profile.avatar} alt="avatar" />
              <span>Hello {profile.name}</span>
            </div>
          </header>

          <section className="dashboard-content">
            <div className="profile-card">
              <div className="left">
                <label htmlFor="avatar-upload">
                  <img src={profile.avatar} alt="Profile" className="profile-pic" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  style={{ display: "none" }}
                />
              </div>

              <div className="right">
                {!editing ? (
                  <>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone || "Not provided"}</p>
                    <p><strong>Bio:</strong> {profile.bio || "N/A"}</p>
                    
                    <button className="edit-btn" onClick={() => setEditing(true)}>Edit Profile</button>
                  </>
                ) : (
                  <form onSubmit={handleEdit}>
                    <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
                    <input type="text" name="bio" value={profile.bio} onChange={handleChange} placeholder="Bio" />
                    <input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" />
                    <button type="submit" className="save-btn">Save</button>
                    <button type="button" onClick={() => setEditing(false)} className="cancel-btn">Cancel</button>
                  </form>
                )}
              </div>
            </div>

            

            <div className="card-group">
              <div className="card">
                <h3>🎬 Liked Playlist</h3>
                {like && like.length > 0 ? (
                  <ul className="playlist-list">
                    {like.map((movie, idx) => (
                      <li key={idx}>
                        <b>{movie.title}</b>
                        <span style={{ color: "#888", fontSize: "0.95em" }}>
                          {Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres}
                        </span>
                        <button
                          onClick={() => handleSetReminder(movie)}
                          style={{
                            background: darkMode ? "#ffd600" : "#7b1f24",
                            color: darkMode ? "#23272f" : "#fff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "0.4rem 1rem",
                            cursor: "pointer",
                            fontWeight: 600,
                            marginLeft: "0.5rem",
                            marginTop: "0.5rem"
                          }}
                        >
                          Set Reminder
                        </button>
                        {reminders[movie.title] && (
                          <div>
                            <span style={{ color: "#a83238" }}>
                              Reminder: {new Date(reminders[movie.title]).toLocaleString()}
                            </span>
                            <button
                              onClick={() => handleRemoveReminder(movie.title)}
                              style={{
                                background: darkMode ? "#ffd600" : "#7b1f24",
                                color: darkMode ? "#23272f" : "#fff",
                                border: "none",
                                borderRadius: "6px",
                                padding: "0.4rem 1rem",
                                cursor: "pointer",
                                fontWeight: 600,
                                marginLeft: "0.5rem",
                                marginTop: "0.5rem"
                              }}
                            >
                              Remove Reminder
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No liked movies yet.</p>
                )}
              </div>

              <div className="card">
                <h3>⭐ Your Favorite Genres</h3>
                <ul className="fav-genres-list">
                  {(() => {
                    // Count genres from liked movies
                    const genreCount = {};
                    like.forEach(movie => {
                      const genres = Array.isArray(movie.genres) ? movie.genres : (movie.genres ? movie.genres.split("|") : []);
                      genres.forEach(g => {
                        genreCount[g] = (genreCount[g] || 0) + 1;
                      });
                    });
                    // Sort by frequency
                    const sortedGenres = Object.entries(genreCount)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5);
                    return sortedGenres.length > 0 ? (
                      sortedGenres.map(([genre, count], idx) => (
                        <li key={idx}>
                          <span className="genre-pill">{genre}</span> <span className="genre-count">({count})</span>
                        </li>
                      ))
                    ) : (
                      <li>No genres yet.</li>
                    );
                  })()}
                </ul>
              </div>

              <div className="card">
                <h3>🎬 Directors & Cast</h3>
                <div className="directors-cast">
                  <div>
                    <strong>Directors:</strong>
                    <ul>
                      {(() => {
                        // Collect unique directors
                        const directors = Array.from(
                          new Set(
                            like
                              .map(m => (Array.isArray(m.directors) ? m.directors : (m.directors ? m.directors.split(",") : [])))
                              .flat()
                              .map(d => d.trim())
                              .filter(Boolean)
                          )
                        );
                        return directors.length > 0 ? (
                          directors.map((d, i) => <li key={i}>{d}</li>)
                        ) : (
                          <li>No directors yet.</li>
                        );
                      })()}
                    </ul>
                  </div>
                  <div>
                    <strong>Cast:</strong>
                    <ul>
                      {(() => {
                        // Collect unique cast members
                        const cast = Array.from(
                          new Set(
                            like
                              .map(m => (Array.isArray(m.stars) ? m.stars : (m.stars ? m.stars.split(",") : [])))
                              .flat()
                              .map(c => c.trim())
                              .filter(Boolean)
                          )
                        );
                        return cast.length > 0 ? (
                          cast.slice(0, 10).map((c, i) => <li key={i}>{c}</li>)
                        ) : (
                          <li>No cast yet.</li>
                        );
                      })()}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Profile;

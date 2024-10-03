import "../resources/layout.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function DefaultLayout({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const userMenu = [
    {
      id: 1,
      name: "Home",
      icon: "ri-home-5-line",
      path: "/",
    },
    {
      id: 2,
      name: "Booking",
      icon: "ri-save-line",
      path: "/booking",
    },
    {
      id: 3,
      name: "Profile",
      icon: "ri-user-3-line",
      path: "/profile",
    },
    {
      id: 4,
      name: "Log out",
      icon: "ri-logout-box-line",
      path: "/logout",
    },
  ];
  const adminMenu = [
    {
      id: 1,
      name: "Home",
      icon: "ri-home-5-line",
      path: "/",
    },
    {
      id: 2,
      name: "Users",
      icon: "ri-id-card-line",
      path: "/admin/users",
    },
    {
      id: 3,
      name: "Busses",
      icon: "ri-bus-2-line",
      path: "/admin/bus",
    },
    {
      id: 4,
      name: "Bookings",
      icon: "ri-save-line",
      path: "/admin/bookings",
    },
    {
      id: 5,
      name: "Log out",
      icon: "ri-logout-box-line",
      path: "/logout",
    },
  ];
  let currentPerson = userMenu;
  let activeRoute = window.location.pathname;
  console.log(activeRoute);
  if (user?.isAdmin) {
    currentPerson = adminMenu;
  }

  return (
    <div id="layout-parent">
      <div className="sidebar">
        <div className="sidebar-intro">
          <h1>Safar</h1>
          <h5>Role: {user?.isAdmin ? "Admin" : "User"}</h5>
        </div>
        <div className="list">
          {currentPerson.map((menuItem) => {
            return (
              <div
                className={
                  activeRoute == menuItem.path
                    ? "list-item active-list-item"
                    : "list-item"
                }
                key={menuItem.id}
                onClick={() => {
                  if (menuItem.path == "/logout") {
                    localStorage.removeItem("token");
                    navigate("/login");
                  } else {
                    navigate(menuItem.path);
                  }
                }}
              >
                <i className={`${menuItem.icon}`}></i>
                <h4>{menuItem.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="layout-header">header</div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;

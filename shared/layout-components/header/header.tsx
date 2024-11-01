import React, { Fragment, useEffect, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { ThemeChanger } from "@/shared/redux/actions";
import store from "@/shared/redux/store";
import { Defaultmenu, Closedmenu, iconText, iconOverayFn, DetachedFn, DoubletFn } from "@/shared/data/switcherdata/switcherdata";
import { UserModel, AuthenticatedUserModelConvert } from "@/interfaces/AuthenticatedUserModel";
const HeadDropDown = dynamic(
  () => import('../../data/header/head'),
  { ssr: false }
)

// FullScreen-end
function Header({ ThemeChanger }: { local_varaiable: any, ThemeChanger: any }) {


  //  headerToggleButton
  useEffect(() => {
    function debounce(func: any, delay: any) {
      let timeoutId: string | number | NodeJS.Timeout | any;

      return function (this: any) {
        const context = this;
        const args = arguments;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
          func.apply(context, args);
        }, delay);
      };
    }

    const handleResize = () => {
      const windowObject = window;
      if (windowObject.innerWidth <= 991) {
        const theme = store.getState()
        ThemeChanger({ ...theme, "dataToggled": "close" })
      } else {
        if (localStorage.Spruhaverticalstyles) {
          let verticalStyles = localStorage.getItem("Spruhaverticalstyles");

          switch (verticalStyles) {
            case "default":
              Defaultmenu(ThemeChanger)
              break;
            case "closed":
              Closedmenu(ThemeChanger)
              break;
            case "icontext":
              iconText(ThemeChanger)
              break;
            case "overlay":
              iconOverayFn(ThemeChanger)
              break;
            case "detached":
              DetachedFn(ThemeChanger)
              break;
            case "doublemenu":
              DoubletFn(ThemeChanger)
              break;
          }
        } else {
          const theme = store.getState()
          ThemeChanger({
            ...theme,
            "toggled": "",
            // "dataVerticalStyle":"default"
          })
        }
      }
    };
    handleResize(); // Check on component mount
    const debouncedResize = debounce(handleResize, 300);
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  function menuClose() {
    const theme = store.getState()
    ThemeChanger({ ...theme, "dataToggled": "close" })
  }
  const headerToggleButton = () => {
    const theme = store.getState()
    let sidemenuType = theme.dataNavLayout;
    if (window.innerWidth >= 992) {
      console.log("Working", sidemenuType, theme.dataVerticalStyle);
      if (sidemenuType === 'vertical') {
        let verticalStyle = theme.dataVerticalStyle;
        const navStyle = theme.dataNavStyle;

        switch (verticalStyle) {
          // closed
          case "closed":
            ThemeChanger({ ...theme, "dataNavStyle": "" })
            if (theme.dataToggled === "close-menu-close") {
              ThemeChanger({ ...theme, "dataToggled": "" })
            } else {
              ThemeChanger({ ...theme, "dataToggled": "close-menu-close" })
            }
            break;
          // icon-overlay
          case "overlay":
            ThemeChanger({ ...theme, "dataNavStyle": "" })
            if (theme.dataToggled === "icon-overlay-close") {
              ThemeChanger({ ...theme, "dataToggled": "" })
            } else {
              if (window.innerWidth >= 992) {
                ThemeChanger({ ...theme, "dataToggled": "icon-overlay-close" })
              }
            }
            break;
          // icon-text
          case "icontext":
            ThemeChanger({ ...theme, "dataNavStyle": "" })
            if (theme.dataToggled === "icon-text-close") {
              ThemeChanger({ ...theme, "dataToggled": "" })
            } else {
              ThemeChanger({ ...theme, "dataToggled": "icon-text-close" })
            }
            break;
          // doublemenu
          case "doublemenu":
            ThemeChanger({ ...theme, "dataNavStyle": "" })
            if (theme.dataToggled === "double-menu-open") {
              ThemeChanger({ ...theme, "dataToggled": "double-menu-close" })
            } else {
              let sidemenu = document.querySelector(".side-menu__item.active");
              if (sidemenu) {
                ThemeChanger({ ...theme, "dataToggled": "double-menu-open" })
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add("double-menu-active");
                } else {

                  ThemeChanger({ ...theme, "dataToggled": "" })
                }
              }
            }

            // doublemenu(ThemeChanger);
            break;
          // detached
          case "detached":
            if (theme.dataToggled === "detached-close") {
              ThemeChanger({ ...theme, "dataToggled": "" })
            } else {
              ThemeChanger({ ...theme, "dataToggled": "detached-close" })
            }
            break;
          // default
          case "default":
            ThemeChanger({ ...theme, "dataToggled": "" })
        }
        switch (navStyle) {
          case "menu-click":
            if (theme.dataToggled === "menu-click-closed") {
              ThemeChanger({ ...theme, "dataToggled": "" });
            }
            else {
              ThemeChanger({ ...theme, "dataToggled": "menu-click-closed" });
            }
            break;
          // icon-overlay
          case "menu-hover":
            if (theme.dataToggled === "menu-hover-closed") {
              ThemeChanger({ ...theme, "dataToggled": "" });
            } else {
              ThemeChanger({ ...theme, "dataToggled": "menu-hover-closed" });

            }
            break;
          case "icon-click":
            if (theme.dataToggled === "icon-click-closed") {
              ThemeChanger({ ...theme, "dataToggled": "" });
            } else {
              ThemeChanger({ ...theme, "dataToggled": "icon-click-closed" });

            }
            break;
          case "icon-hover":
            if (theme.dataToggled === "icon-hover-closed") {
              ThemeChanger({ ...theme, "dataToggled": "" });
            } else {
              ThemeChanger({ ...theme, "dataToggled": "icon-hover-closed" });

            }
            break;
        }
      }
    }
    else {
      const theme = store.getState()
      if (theme.dataToggled === "close") {
        ThemeChanger({ ...theme, "dataToggled": "open" })
        setTimeout(() => {
          if (theme.dataToggled == "open") {
            document.querySelector("#responsive-overlay")?.classList.add("active");
            document.querySelector("#responsive-overlay")?.addEventListener("click", () => {
              document.querySelector("#responsive-overlay")?.classList?.remove("active");
              menuClose();
            });
          }
          window.addEventListener("resize", () => {
            if (window.screen.width >= 992) {
              document.querySelector("#responsive-overlay")?.classList.remove("active");
            }
          });
        }, 100);
      } else {
        ThemeChanger({ ...theme, "dataToggled": "close" })
      }
    }
  }
  // local data
  const [localData, setLocalData] = useState<UserModel>({} as UserModel)

  // loading local data
  React.useEffect(() => {
    setLocalData(AuthenticatedUserModelConvert.toAuthenticatedUserModel(localStorage.getItem('card_user') as string));
  }, [])
  return (
    <Fragment>

      <header className="app-header">
        <Container fluid className="main-header-container">
          <div className="header-content-left">
            <div className="header-element">
              <div className="horizontal-logo">
                {/*  */}
              </div>
            </div>
            <div className="header-element">
              <a aria-label="Hide Sidebar" className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle" data-bs-toggle="sidebar" onClick={() => headerToggleButton()}><span></span></a>
            </div>

          </div>
          <div className="header-content-right">
            <div className="d-flex order-lg-2 align-items-center ms-auto">

              <HeadDropDown />

              {/* mobile view image */}
              {localData && (
                <>
                  <div className="p-2 ">
                    <span className="d-block">{localData.name}</span>
                    <small className="d-block">{localData.type == 1 ? 'Admin' : 'Client'}</small>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                      <img src={localData.picture} className="rounded" alt={``} width={40} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {/* <Dropdown.Item href="#/action-1">Profile</Dropdown.Item> */}
                      {/* {localData.type === 1 && (<Dropdown.Item href="/dashboard/Settings">Settings</Dropdown.Item>)} */}
                      <Dropdown.Item href="javascript:void(0)" onClick={() => {
                        localStorage.removeItem('card_user')
                        window.location.replace("/");
                        window.location.reload();
                      }}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}

            </div>

          </div>
        </Container>
      </header>
    </Fragment>
  );
}

Header.propTypes = {};

// Header.defaultProps = {};
const mapStateToProps = (state: any) => ({
  local_varaiable: state
})
export default connect(mapStateToProps, { ThemeChanger })(Header);

import {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
  Avatar,
  Typography,
} from "@mui/material";

import CommonButton from "../components/CommonButton";
import Colors from "../colors";
import { Theme } from "../GlobalStyles";

import AppBarr from "../components/appBar";
import HrTable from "../components/HrTable";
import HrForm from "../components/HrForm";

import { addHRDataActionInitiate } from "../redux/actions/addHRAction";
import { getHRDataActionInitiate } from "../redux/actions/getHRAction";
import { updateHRDataActionInitiate } from "../redux/actions/updateHRAction";
import { deleteHRDataActionInitiate } from "../redux/actions/deleteHRAction";

import { toast } from "react-toastify";


/* =====================================================
   INITIAL HR OBJECT
===================================================== */

const createInitialHR = () => ({
  id: "",
  name: "",
  email: "",
  password: "",
  address: "",
  role: "hr",
  profileImageFile: null,
  profile_image_url: "",
});


/* =====================================================
   COMPANY DASHBOARD
===================================================== */

function CompanyDashboard({
  darkMode,
  setDarkMode,
  themeColor,
  setThemeColor,

  // Parent nunchi vasthe use chestham.
  // Parent ivvakapothe true ga untundi.
  showHRs = true,
  setShowHRs,
}) {
  const dispatch = useDispatch();


  /* =====================================================
     THEME
  ===================================================== */

  const color = useMemo(
    () => Colors(darkMode, themeColor),
    [darkMode, themeColor]
  );


  /* =====================================================
     REDUX HR DATA
  ===================================================== */

  const { hrs = [] } = useSelector(
    (state) => state.gethrdata || {}
  );


  /* =====================================================
     LOCAL STATES
  ===================================================== */

  const [viewHR, setViewHR] = useState(null);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);

  const [type, setType] = useState("add");

  const [hr, setHr] = useState(createInitialHR);


  /* =====================================================
     PAGINATION
  ===================================================== */

  const hrData = useMemo(() => {
    const startIndex = page * rowsPerPage;

    const endIndex =
      startIndex + rowsPerPage;

    return hrs.slice(
      startIndex,
      endIndex
    );
  }, [hrs, page, rowsPerPage]);


  /* =====================================================
     FETCH HR DATA
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    const fetchHRs = async () => {
      try {
        setLoading(true);

        await dispatch(
          getHRDataActionInitiate()
        );
      } catch (error) {
        console.error(
          "Failed to fetch HRs:",
          error
        );

        toast.error(
          "Failed to load HR data"
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchHRs();

    return () => {
      mounted = false;
    };
  }, [dispatch]);


  /* =====================================================
     FIREBASE NOTIFICATION
     LAZY LOAD
  ===================================================== */

  useEffect(() => {
    const tokenSaved =
      localStorage.getItem(
        "device_token_saved"
      );

    if (tokenSaved) {
      return;
    }

    let mounted = true;

    const setupNotificationPermission =
      async () => {
        try {
          const {
            requestNotificationPermission,
          } = await import(
            "../notification"
          );

          if (!mounted) {
            return;
          }

          await requestNotificationPermission(
            dispatch
          );

          if (mounted) {
            localStorage.setItem(
              "device_token_saved",
              "true"
            );
          }
        } catch (error) {
          console.error(
            "Failed to setup notification permission:",
            error
          );
        }
      };

    setupNotificationPermission();

    return () => {
      mounted = false;
    };
  }, [dispatch]);


  /* =====================================================
     ADD HR
  ===================================================== */

  const handleAdd = useCallback(() => {
    setType("add");

    setHr(
      createInitialHR()
    );

    setShowForm(true);
  }, []);


  /* =====================================================
     EDIT HR
  ===================================================== */

  const handleEdit = useCallback(
    (item) => {
      setType("edit");

      setHr({
        ...item,
        password: "",
      });

      setShowForm(true);
    },
    []
  );


  /* =====================================================
     VIEW HR
  ===================================================== */

  const handleView = useCallback(
    (item) => {
      setViewHR(item);
    },
    []
  );


  /* =====================================================
     DELETE HR
  ===================================================== */

  const handleDelete = useCallback(
    async (id) => {
      try {
        setLoading(true);

        await dispatch(
          deleteHRDataActionInitiate(id)
        );

        await dispatch(
          getHRDataActionInitiate()
        );

        /*
         * Current page empty ayithe
         * previous page ki move chestham.
         */

        const remainingRecords =
          Math.max(
            hrs.length - 1,
            0
          );

        const maxPage = Math.max(
          0,
          Math.ceil(
            remainingRecords /
              rowsPerPage
          ) - 1
        );

        if (page > maxPage) {
          setPage(maxPage);
        }
      } catch (error) {
        console.error(
          "Delete HR error:",
          error
        );

        toast.error(
          "Delete failed"
        );
      } finally {
        setLoading(false);
      }
    },
    [
      dispatch,
      hrs.length,
      page,
      rowsPerPage,
    ]
  );


  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleChange = useCallback(
    (event) => {
      const {
        name,
        value,
      } = event.target;

      setHr(
        (previousHR) => ({
          ...previousHR,
          [name]: value,
        })
      );
    },
    []
  );


  /* =====================================================
     PAGE CHANGE
  ===================================================== */

  const handleChangePage =
    useCallback(
      (event, newPage) => {
        setPage(newPage);
      },
      []
    );


  /* =====================================================
     ROWS PER PAGE
  ===================================================== */

  const handleChangeRowsPerPage =
    useCallback(
      (event) => {
        const newRowsPerPage =
          parseInt(
            event.target.value,
            10
          );

        setRowsPerPage(
          newRowsPerPage
        );

        setPage(0);
      },
      []
    );


  /* =====================================================
     CLOSE FORM
  ===================================================== */

  const handleClose =
    useCallback(() => {
      setShowForm(false);

      setHr(
        createInitialHR()
      );
    }, []);


  /* =====================================================
     SUBMIT HR
  ===================================================== */

  const submitHandle =
    useCallback(
      async ({
        formData,
        id,
      }) => {
        try {
          setLoading(true);

          if (type === "add") {
            /*
             * ADD HR
             */

            await dispatch(
              addHRDataActionInitiate(
                formData
              )
            );

            /*
             * Fresh HR list
             */

            await dispatch(
              getHRDataActionInitiate()
            );

            /*
             * New HR add ayyaka
             * first page ki return.
             */

            setPage(0);
          } else {
            /*
             * UPDATE HR
             */

            await dispatch(
              updateHRDataActionInitiate(
                id,
                formData
              )
            );

            /*
             * Update tarvata
             * fresh data fetch.
             */

            await dispatch(
              getHRDataActionInitiate()
            );
          }

          setHr(
            createInitialHR()
          );

          setShowForm(false);

          toast.success(
            type === "add"
              ? "HR added successfully"
              : "HR updated successfully"
          );
        } catch (error) {
          console.error(
            "HR submit error:",
            error
          );

          toast.error(
            "Something went wrong"
          );
        } finally {
          setLoading(false);
        }
      },
      [type, dispatch]
    );


  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <>
      {/* =================================================
          APP BAR
      ================================================= */}

      <AppBarr
        roled="company"
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        setShowHRs={setShowHRs}
      />


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <Box
        component="main"
        sx={{
          p: 2,

          /*
           * Navbar height kosam top spacing.
           */

          pt: 10,

          background:
            color.background,

          minHeight: "100vh",
        }}
      >

        {/* =================================================
            HR TABLE
        ================================================= */}

        {showHRs && (
          <HrTable
            data={hrData}
            darkMode={darkMode}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleView={handleView}
            loading={loading}
          />
        )}


        {/* =================================================
            HR VIEW DIALOG
        ================================================= */}

        {viewHR && (
          <Dialog
            open={Boolean(viewHR)}
            onClose={() =>
              setViewHR(null)
            }
            maxWidth="xs"
            fullWidth
          >

            {/* HEADER */}

            <DialogTitle
              sx={{
                textAlign:
                  "center",

                fontSize:
                  Theme.font20Bold,

                backgroundColor:
                  color.navbar,

                color:
                  color.text,
              }}
            >
              HR Details
            </DialogTitle>


            {/* CONTENT */}

            <DialogContent
              sx={{
                p: 4,
              }}
            >

              {/* PROFILE IMAGE */}

              <Box
                sx={{
                  display:
                    "flex",

                  justifyContent:
                    "center",

                  mb: 3,
                }}
              >

                <Avatar
                  src={
                    viewHR.profile_image_url ||
                    ""
                  }
                  alt={
                    viewHR.name ||
                    "HR profile"
                  }
                  sx={{
                    width: 100,
                    height: 100,

                    bgcolor:
                      color.headings,

                    mt: 2,

                    fontSize: 40,
                  }}
                >
                  {viewHR.name
                    ?.charAt(0)
                    .toUpperCase()}
                </Avatar>

              </Box>


              {/* HR DETAILS */}

              <Box
                sx={{
                  display:
                    "flex",

                  flexDirection:
                    "column",

                  gap: 2,
                }}
              >

                {/* NAME */}

                <Box
                  sx={{
                    display:
                      "flex",

                    gap: 2,

                    borderBottom:
                      "1px solid #ddd",

                    pb: 1,
                  }}
                >

                  <Typography
                    sx={{
                      fontSize:
                        Theme.font16Bold,

                      minWidth: 65,
                    }}
                  >
                    Name:
                  </Typography>

                  <Typography
                    sx={{
                      wordBreak:
                        "break-word",
                    }}
                  >
                    {viewHR.name}
                  </Typography>

                </Box>


                {/* EMAIL */}

                <Box
                  sx={{
                    display:
                      "flex",

                    gap: 2,

                    borderBottom:
                      "1px solid #ddd",

                    pb: 1,
                  }}
                >

                  <Typography
                    sx={{
                      fontSize:
                        Theme.font16Bold,

                      minWidth: 65,
                    }}
                  >
                    Email:
                  </Typography>

                  <Typography
                    sx={{
                      wordBreak:
                        "break-word",
                    }}
                  >
                    {viewHR.email}
                  </Typography>

                </Box>


                {/* ADDRESS */}

                <Box
                  sx={{
                    display:
                      "flex",

                    gap: 2,

                    borderBottom:
                      "1px solid #ddd",

                    pb: 1,
                  }}
                >

                  <Typography
                    sx={{
                      fontSize:
                        Theme.font16Bold,

                      minWidth: 65,
                    }}
                  >
                    Address:
                  </Typography>

                  <Typography
                    sx={{
                      wordBreak:
                        "break-word",
                    }}
                  >
                    {viewHR.address}
                  </Typography>

                </Box>

              </Box>

            </DialogContent>


            {/* ACTIONS */}

            <DialogActions
              sx={{
                justifyContent:
                  "center",

                pb: 3,
              }}
            >

              <CommonButton
                onClick={() =>
                  setViewHR(null)
                }
                sx={{
                  backgroundColor:
                    color.navbar,

                  color:
                    color.text,
                }}
              >
                Close
              </CommonButton>

            </DialogActions>

          </Dialog>
        )}


        {/* =================================================
            ADD / EDIT HR FORM
        ================================================= */}

        <HrForm
          darkMode={darkMode}
          hr={hr}
          handleChange={handleChange}
          submitHandle={submitHandle}
          show={showForm}
          handleClose={handleClose}
          type={type}
          loading={loading}
        />


        {/* =================================================
            PAGINATION
        ================================================= */}

        {showHRs && (
          <TablePagination
            component="div"

            count={
              hrs.length
            }

            page={page}

            rowsPerPage={
              rowsPerPage
            }

            rowsPerPageOptions={[
              5,
              10,
              25,
            ]}

            onPageChange={
              handleChangePage
            }

            onRowsPerPageChange={
              handleChangeRowsPerPage
            }

            sx={{
              mt: 2,
              color:
                color.text,
            }}
          />
        )}

      </Box>
    </>
  );
}


export default CompanyDashboard;
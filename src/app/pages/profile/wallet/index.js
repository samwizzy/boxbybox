import React, { useEffect } from "react";
import BoxUtils from "../../../utils/BoxUtils";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import withReducer from "../../../store/withReducer";
import * as Actions from "./../store/actions";
import reducer from "./../store/reducers";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "./../../../common/components";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
} from "@material-ui/core";
import { Alert, AlertTitle, Pagination, Skeleton } from "@material-ui/lab";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ProfileSidebar from "./../components/ProfileSidebar";
import FundWalletDialog from "./components/FundWalletDialog";
import CardDialog from "./components/CardDialog";

const useStyles = makeStyles((theme) => ({
  card: {},
  toolbar: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(2),
  },
}));

function ProfileWallet(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const {
    openFundWalletDialog,
    openNewCardDialog,
    getWalletBalance,
    getWalletTransactions,
    getPaymentGateways,
    wallet,
    transactions,
    paymentGateways,
  } = props;

  useEffect(() => {
    getWalletBalance();
    getWalletTransactions();
    getPaymentGateways();
  }, [getWalletBalance, getWalletTransactions, getPaymentGateways]);

  const handlePaginate = (event, page) => {
    dispatch(/*Actions.getIpoStakeByPropertyId(params.id, page - 1)*/);
  };

  console.log(transactions, paymentGateways);

  return (
    <div className="container">
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <ProfileSidebar />
            </Grid>
            <Grid item xs={12} md={8}>
              <Toolbar className={classes.toolbar}>
                <h3 className="text-lg text-gray-600">My Wallet</h3>
              </Toolbar>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4">
                  <Card className={classes.card}>
                    <CardContent>
                      <div className="flex flex-col items-center space-y-16">
                        <section className="flex flex-col items-center">
                          {wallet ? (
                            <h2 className="text-2xl text-gray-800 mb-2">
                              {BoxUtils.formatCurrency(wallet.amount)}
                            </h2>
                          ) : (
                            <Skeleton />
                          )}
                          <h3 className="text-sm text-gray-500">Balance</h3>
                        </section>
                        <section className="flex items-center justify-between space-x-8">
                          <AppButton
                            variant="contained"
                            color="secondary"
                            onClick={openFundWalletDialog}
                          >
                            Fund Wallet
                          </AppButton>
                          <AppButton variant="outlined" color="secondary">
                            Withdraw
                          </AppButton>
                        </section>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className={classes.card}>
                    <CardHeader title="Payment Methods" disableTypography />
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <section className="flex flex-col">
                            <h3 className="text-sm text-gray-600">**** 9314</h3>
                            <span className="text-xs text-gray-600">
                              Exp: 05/23
                            </span>
                          </section>
                          <section>
                            <img
                              alt="mastercard"
                              src="/assets/images/profile/mastercard.svg"
                              className="w-10"
                            />
                          </section>
                        </div>
                        <div className="flex justify-between">
                          <section className="flex flex-col">
                            <h3 className="text-sm text-gray-600">**** 9314</h3>
                            <span className="text-xs text-gray-600">
                              Exp: 05/23
                            </span>
                          </section>
                          <section>
                            <img
                              alt="verve card"
                              src="/assets/images/profile/verve_card.svg"
                              className="w-10"
                            />
                          </section>
                        </div>
                        <div className="flex justify-end">
                          <AppButton
                            color="secondary"
                            size="small"
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={openNewCardDialog}
                          >
                            Add card
                          </AppButton>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className={classes.card}>
                  <CardHeader disableTypography title="Transactions" />
                  <CardContent>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Transaction Type</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {!transactions.total && (
                          <Alert severity="info">
                            <AlertTitle>Hey there!</AlertTitle>
                            <div className="flex items-center space-x-4">
                              You have not made any transactions —&nbsp;
                              <strong>be the first to stake now!</strong>
                            </div>
                          </Alert>
                        )}
                        {transactions.entities.map((trans, i) => (
                          <TableRow key={i}>
                            <TableCell>{trans.transactionType}</TableCell>
                            <TableCell>
                              {trans.transactionDescription}
                            </TableCell>
                            <TableCell>
                              {BoxUtils.formatCurrency(trans.amount)}
                            </TableCell>
                            <TableCell>{trans.createdAt}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {transactions.total ? (
                      <div className="flex items-center justify-center mt-16">
                        <Pagination
                          count={_.ceil(
                            transactions.total / transactions.limit
                          )}
                          variant="outlined"
                          color="secondary"
                          onChange={handlePaginate}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>

          <FundWalletDialog paymentGateways={paymentGateways} />
          <CardDialog />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ profileWallet }) => {
  const { wallet } = profileWallet;
  return {
    wallet: wallet.wallet,
    transactions: wallet.transactions,
    paymentGateways: wallet.paymentGateways,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getWalletBalance: Actions.getWalletBalance,
      getWalletTransactions: Actions.getWalletTransactions,
      getPaymentGateways: Actions.getPaymentGateways,
      openFundWalletDialog: Actions.openFundWalletDialog,
      openNewCardDialog: Actions.openNewCardDialog,
    },
    dispatch
  );
};

export default withReducer(
  "profileWallet",
  reducer
)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileWallet)));

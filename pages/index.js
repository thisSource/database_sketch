import { useState, useEffect } from "react";
import { supabase } from "../components/client";

import Portfolio from "../components/Portfolio";
import Nav from "../components/Nav";
import Users from "../components/Users";

export default function Home() {
  let [nav, setNav] = useState([
    { nav_id: 1, nav_name: "Loading", nav_value: 0 }
  ]);

  let [subscription, setsubscription] = useState(100);

  let [redemtion, setRedemtion] = useState(95);

  let [user, setUser] = useState([
    { user_id: 1, first_name: "Loading", balance: 0, shares: 0 },
    { user_id: 2, first_name: "Loading", balance: 0, shares: 0 },
    { user_id: 3, first_name: "Loading", balance: 0, shares: 0 }
  ]);

  let [assets, setAssets] = useState([
    { asset_id: 1, asset_name: "Loading", asset_value: 0 }
  ]);

  // GET DATA

  async function getNav() {
    const { data } = await supabase.from("nav").select("*"); // Select all the tasks from the Task Table
    setNav(data);
  }

  async function getUsers() {
    const { data } = await supabase
      .from("users")
      .select("*")
      .order("user_id", { ascending: true }); // Select all the tasks from the Task Table
    setUser(data);
  }

  async function getAssets() {
    const { data } = await supabase
      .from("assets")
      .select("*")
      .order("asset_id", { ascending: true }); // Select all the tasks from the Task Table
    setAssets(data);
  }

  // RESET DATA
  async function resetAll() {
    let asset_cash_value = 0;
    let asset_portfolio_value = 10000;
    let asset_cash_liability = 0;

    let nav_value_set = 10000;
    let total_share_set = 10000;
    let nav_per_share_set = 1;

    let alex_balance = 3333;
    let philip_balance = 3333;
    let jens_balance = 3334;

    let alex_shares = 3333;
    let philip_shares = 3333;
    let jens_shares = 3334;

    let alex_claim = 0;
    let philip_claim = 0;
    let jens_claim = 0;

    await supabase
      .from("assets")
      .update({ asset_value: asset_cash_value })
      .match({ asset_id: 1 });
    await supabase
      .from("assets")
      .update({ asset_value: asset_portfolio_value })
      .match({ asset_id: 2 });

    await supabase
      .from("assets")
      .update({ asset_value: asset_cash_liability })
      .match({ asset_id: 3 });

    await supabase
      .from("users")
      .update({ balance: alex_balance })
      .match({ user_id: 1 });
    await supabase
      .from("users")
      .update({ balance: philip_balance })
      .match({ user_id: 2 });
    await supabase
      .from("users")
      .update({ balance: jens_balance })
      .match({ user_id: 3 });

    await supabase
      .from("users")
      .update({ shares: alex_shares })
      .match({ user_id: 1 });
    await supabase
      .from("users")
      .update({ shares: philip_shares })
      .match({ user_id: 2 });
    await supabase
      .from("users")
      .update({ shares: jens_shares })
      .match({ user_id: 3 });

    await supabase
      .from("users")
      .update({ cash_claim: alex_claim })
      .match({ user_id: 1 });
    await supabase
      .from("users")
      .update({ cash_claim: philip_claim })
      .match({ user_id: 2 });
    await supabase
      .from("users")
      .update({ cash_claim: jens_claim })
      .match({ user_id: 3 });

    await supabase
      .from("nav")
      .update({ nav_value: nav_value_set })
      .match({ nav_id: 1 });
    await supabase
      .from("nav")
      .update({ total_shares: total_share_set })
      .match({ nav_id: 1 });
    await supabase
      .from("nav")
      .update({ nav_per_share: nav_per_share_set })
      .match({ nav_id: 1 });
  }

  // UPDATE DATA
  async function updateTotalNav(e) {
    let inc = e + nav[0].nav_value;
    await supabase.from("nav").update({ nav_value: inc }).match({ nav_id: 1 });
  }

  async function updateTotalShare(e) {
    let inc = e + nav[0].nav_value;
    let nps = inc / (e + nav[0].total_shares);
    await supabase
      .from("nav")
      .update({ total_shares: inc })
      .match({ nav_id: 1 });
  }

  async function updateNavPerShare() {
    let nps = nav[0].nav_value / nav[0].total_shares;
    await supabase
      .from("nav")
      .update({ nav_per_share: nps })
      .match({ nav_id: 1 });
  }

  async function updateUserCashClaim(e) {
    let inc = e;
    await supabase
      .from("users")
      .update({ cash_claim: inc })
      .match({ user_id: 1 });
    await supabase
      .from("users")
      .update({ cash_claim: inc })
      .match({ user_id: 2 });
    await supabase
      .from("users")
      .update({ cash_claim: inc })
      .match({ user_id: 3 });
  }

  async function updateUserBalance(e) {
    let userBalanceA = user[0].balance + nav[0].nav_per_share * e;
    let userBalanceB = user[1].balance + nav[0].nav_per_share * e;
    let userBalanceC = user[2].balance + nav[0].nav_per_share * e;

    await supabase
      .from("users")
      .update({ balance: userBalanceA })
      .match({ user_id: 1 });
    await supabase
      .from("users")
      .update({ balance: userBalanceB })
      .match({ user_id: 2 });
    await supabase
      .from("users")
      .update({ balance: userBalanceC })
      .match({ user_id: 3 });
  }

  async function updateUserValueBalance() {
    let userBalanceA = user[0].shares * nav[0].nav_per_share;
    let userBalanceB = user[1].shares * nav[0].nav_per_share;
    let userBalanceC = user[2].shares * nav[0].nav_per_share;

    await supabase
      .from("users")
      .update({ balance: userBalanceA })
      .match({ user_id: 1 });
    await supabase
      .from("users")
      .update({ balance: userBalanceB })
      .match({ user_id: 2 });
    await supabase
      .from("users")
      .update({ balance: userBalanceC })
      .match({ user_id: 3 });
  }

  async function updateUserShares(e) {
    //fix
    let incA = e + user[0].shares;
    let incB = e + user[1].shares;
    let incC = e + user[2].shares;

    await supabase.from("users").update({ shares: incA }).match({ user_id: 1 });
    await supabase.from("users").update({ shares: incB }).match({ user_id: 2 });
    await supabase.from("users").update({ shares: incC }).match({ user_id: 3 });
  }

  async function updateCash(e) {
    let inc = parseInt(e) + assets[0].asset_value;
    await supabase
      .from("assets")
      .update({ asset_value: inc })
      .match({ asset_id: 1 });
  }

  async function updateCashLiability(e) {
    let inc = parseInt(e) + assets[2].asset_value;
    await supabase
      .from("assets")
      .update({ asset_value: inc })
      .match({ asset_id: 3 });
  }

  async function cashToPortfolio(e) {
    let inc = assets[1].asset_value + assets[0].asset_value;

    await supabase
      .from("assets")
      .update({ asset_value: inc })
      .match({ asset_id: 2 });

    await supabase
      .from("assets")
      .update({ asset_value: 0 })
      .match({ asset_id: 1 });
  }

  async function updatePortfolio(e) {
    let inc = parseInt(e) + assets[1].asset_value;
    await supabase
      .from("assets")
      .update({ asset_value: inc })
      .match({ asset_id: 2 });
  }

  useEffect(() => {
    getAssets();
    getNav();
    getUsers();
    updateUserValueBalance();
  }, [user]);

  return (
    <div className="grid grid-cols-2 gap-8 my-8 mx-10 lg:text-base text-xxs">
      <div className="">
        {/* USER SIDE */}
        <div className="content">
          <p className="my-4">DATABASE</p>

          <p className="my-2">USER TABLE</p>
          <div className="border-b-2 grid grid-cols-4 gap-1">
            <span className="mr-5">User</span>
            <span>Balance</span>
            <span>Shares</span>
            <span>Cash claim</span>
          </div>
          {user.map((item) => (
            <Users
              key={item.user_id}
              user_name={item.user_name}
              balance={Number(item.balance).toFixed(3)}
              shares={Number(item.shares).toFixed(3)}
              cash_claim={Number(item.cash_claim)}
            />
          ))}
        </div>

        {/* ASSET SIDE */}
        <div className="mt-8">
          <p className="my-2">ASSETS TABLE</p>
          <div className="border-b-2 grid grid-cols-2 gap-1">
            <span className="mr-5">Asset</span>
            <span className="mr-5">Value</span>
          </div>
          {assets.map((item) => (
            <Portfolio
              key={item.asset_id}
              asset_name={item.asset_name}
              asset_value={item.asset_value}
            />
          ))}
        </div>

        {/* NAV */}
        <div className="mt-8">
          {" "}
          <p className="my-2">NET ASSET VALUE</p>
          <div className="border-b-2 grid grid-cols-3 gap-1">
            <span className="mr-5">NAV Value</span>
            <span className="mr-5">Num of shares</span>
            <span className="mr-5">Nav per share</span>
          </div>
          {nav.map((item) => (
            <Nav
              key={item.nav_id}
              nav_name={item.nav_name}
              nav_value={item.nav_value}
              total_shares={item.total_shares}
              nav_per_share={item.nav_per_share}
            />
          ))}
        </div>
      </div>

      {/* //UPDATE ACTIONS */}
      <div className="">
        <p className="my-4"> NET ASSET VALUE (NAV) </p>
        <p className="content"> NAV CYCLE </p>
        <div className="my-2">
          <button
            className="bg-gray-200 p-2 rounded-md my-2 hover:bg-green-400"
            onClick={() => {
              resetAll();
            }}
          >
            Reset database
          </button>
        </div>

        <div className="my-2">
          <p className="">
            {" "}
            STEP 1 - User invest (subscribe) cash to the fund.
          </p>
          <p>
            {" "}
            The fund issues shares based on nav per share. (FORMULA: Cash
            subscribed / nav per share). The database updates cash asset, total
            NAV, user shares and user balance{" "}
          </p>
          <p className="my-4">
            IN PROTOTYPE: input is the aggregated transactions from tink per
            user, when the user click transfer to fund. This will trigger the
            payment. and when the payment is done and matches the tink amount,
            update cash asset
          </p>
          <button
            className="bg-gray-200 p-2 rounded-md my-2 hover:bg-green-400"
            onClick={() => {
              updateUserShares(subscription / nav[0].nav_per_share);
              updateCash(subscription * user.length);
              updateTotalNav(subscription * user.length);
              updateTotalShare(subscription * user.length);
              updateUserBalance(subscription);
            }}
          >
            Users subscribe cash
          </button>
        </div>

        {/* CASH TO PORTFOLIO */}
        <p className=""> STEP 2 - INVEST CASH IN FUND PORTFOLIO </p>
        <p> The fund invest user cash into equity (stocks, bonds, etc) </p>
        <p className="my-4">
          IN PROTOTYPE: The cash is transfered on Nordnet to the portfolio by
          buying stocks. The database is updated with fetching fund data from
          Nordnet API
        </p>
        <div className="content">
          <button
            className="bg-gray-200 p-2 rounded-md my-2 hover:bg-green-400"
            onClick={() => {
              cashToPortfolio();
            }}
          >
            Cash to portfolio
          </button>
        </div>

        {/* UPDATE PORTFOLIO (VALUE CHANGE) */}
        <p className=""> STEP 3 - FUND PORTFOLIO VALUE CHANGE </p>
        <p>
          {" "}
          The fund value fluctuates as equity increases or decreases in value.
          The value of the fund or NAV is calculated once a day{" "}
        </p>

        <p className="my-4">
          IN PROTOTYPE: Fund value is updated by fetching fund data from Nordnet
          API
        </p>

        <div className="content">
          <button
            className="bg-gray-200 p-2 rounded-md my-2 hover:bg-green-400"
            onClick={() => {
              let ranFLux = Math.random();
              updatePortfolio(100 * ranFLux);
              updateTotalNav(100 * ranFLux);
            }}
          >
            Value of equity Up/Down
          </button>
        </div>

        <p className=""> STEP 4 - CALCULATE NAV PER SHARE </p>
        <p>
          {" "}
          Calculate the NAV per share. NAV per shares moves with the value of
          the fund. (FORMULA: NAV / Total shares)
        </p>

        <p className="my-4">
          IN PROTOTYPE: The NAV PER SHARE is calculated on a set frequency
          (minimum once per day), along with user data, nav data, and asset data{" "}
        </p>

        <div className="content">
          <button
            className="bg-gray-200 p-2 rounded-md my-2 hover:bg-green-400"
            onClick={() => {
              updateNavPerShare();
            }}
          >
            NAV per share
          </button>
        </div>

        <div className="my-2">
          <p>
            {" "}
            The process restarts, shares are issues based on cash investment
            divided by NAV per share
          </p>

          <p className="mt-8 mb-4"> REDEMTION PROCESS</p>

          <p> STEP 1: User request to withdraw cash and sell fund shares</p>

          <p className="my-4">
            IN PROTOTYPE: A notification is sent to fund manager that a user
            want to withdraw. The fund manager starts the process{" "}
          </p>

          <button
            className="bg-gray-200 p-2 rounded-md my-2 hover:bg-green-400"
            onClick={() => {
              updateUserCashClaim(redemtion);
              updateCashLiability(redemtion * user.length);
            }}
          >
            Request whithdrawal
          </button>

          <p> STEP 2: Portfolio to cash, the fund sells equity to pay user</p>

          <p className="my-4">
            IN PROTOTYPE: The fund manager sells shares at Nordnet. Cash and
            portfolio assets are updated in database using Nordnet API
          </p>

          <button
            className="bg-gray-200 p-2 rounded-md my-2 hover:bg-green-400"
            onClick={() => {
              updatePortfolio(-assets[2].asset_value);
              updateCash(assets[2].asset_value);
            }}
          >
            Portfolio to cash
          </button>

          <p>
            {" "}
            STEP 3: The fund pays the user, updates total NAV, total shares,
            user shares, user balance, cash liability, portfolio asset and cash
            asset
          </p>

          <p className="my-4">
            IN PROTOTYPE: The payment is done to user account via tink payment
            or other payment service. When payment is complete the redemtion is
            processed{" "}
          </p>

          <button
            className="bg-gray-200 p-2 rounded-md my-2 hover:bg-green-400"
            onClick={() => {
              updateUserCashClaim(
                assets[2].asset_value - user[0].cash_claim * user.length
              ); //fix code
              updateCash(-user[0].cash_claim * user.length); //fix code
              updateCashLiability(-user[0].cash_claim * user.length); //fix code
              updateUserShares(-(redemtion / nav[0].nav_per_share));
              updateTotalNav(-user[0].cash_claim * user.length);
              updateTotalShare(
                -(redemtion / nav[0].nav_per_share) * user.length
              );
            }}
          >
            Process redemtion
          </button>
        </div>
      </div>
      <div className="mt-8">
        <div>
          <a
            className="text-blue-700"
            target="_blank"
            rel="noreferrer"
            href="https://www.investor.gov/introduction-investing/investing-basics/investment-products/mutual-funds-and-exchange-traded-1#:~:text=A%20mutual%20fund%20is%20a,buy%20shares%20in%20mutual%20funds."
          >
            What is a mutual fund?
          </a>
        </div>
        <div>
          <a
            className="text-blue-700"
            target="_blank"
            rel="noreferrer"
            href="https://www.investopedia.com/terms/o/open-endfund.asp"
          >
            What is an open-ended fund?
          </a>
        </div>
        <div>
          <a
            className="text-blue-700"
            target="_blank"
            rel="noreferrer"
            href="https://www.investor.gov/introduction-investing/investing-basics/glossary/net-asset-value#:~:text=%22Net%20asset%20value%2C%22%20or,NAV%20will%20be%20%2490%20million."
          >
            What is Net asset value (NAV)?
          </a>
        </div>
      </div>
    </div>
  );  
}


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

  let [user, setUser] = useState([
    { user_id: 1, first_name: "Loading", balance: 0, shares: 0 }
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

    let nav_value_set = 10000;
    let total_share_set = 10000;
    let nav_per_share_set = 1;

    let alex_balance = 3333;
    let philip_balance = 3333;
    let jens_balance = 3334;

    let alex_shares = 3333;
    let philip_shares = 3333;
    let jens_shares = 3334;

    await supabase
      .from("assets")
      .update({ asset_value: asset_cash_value })
      .match({ asset_id: 1 });
    await supabase
      .from("assets")
      .update({ asset_value: asset_portfolio_value })
      .match({ asset_id: 2 });

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

  async function updateUserShares(e) {
    let inc = e + user[0].shares;
    await supabase.from("users").update({ shares: inc }).match({ user_id: 1 });
    await supabase.from("users").update({ shares: inc }).match({ user_id: 2 });
    await supabase.from("users").update({ shares: inc }).match({ user_id: 3 });
  }

  async function updateAllUser(e) {
    user.map(async (item) => {
      let newBalance = item.shares * e;
      await supabase
        .from("users")
        .update({ balance: newBalance })
        .match({ user_id: item.user_id });
    });
  }

  async function updateCash(e) {
    let inc = parseInt(e) + assets[0].asset_value;
    await supabase
      .from("assets")
      .update({ asset_value: inc })
      .match({ asset_id: 1 });
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
    getUsers();
    getAssets();
    getNav();
    updateAllUser(nav[0].nav_per_share);
  }, [assets]);

  return (
    <div className="grid grid-cols-2 gap-8 my-8 mx-10 lg:text-base text-xs">
      <div className="">
        {/* USER SIDE */}
        <div className="content">
          <p className="my-4">DATABASE</p>

          <p className="my-2">USER TABLE</p>
          <div className="border-b-2 grid grid-cols-3 gap-1">
            <span className="mr-5">User</span>
            <span>Balance</span>
            <span>Shares</span>
          </div>
          {user.map((item) => (
            <Users
              key={item.user_id}
              user_name={item.user_name}
              balance={Number(item.balance).toFixed(2)}
              shares={Number(item.shares).toFixed(2)}
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
          <button
            className="bg-gray-200 p-2 rounded-md my-2 hover:bg-green-400"
            onClick={() => {
              updateUserShares(subscription);
              updateCash(subscription * user.length);
              updateTotalNav(subscription * user.length);
              updateTotalShare(subscription * user.length);
            }}
          >
            Users subscribe cash
          </button>
        </div>

        {/* CASH TO PORTFOLIO */}
        <p className=""> STEP 2 - INVEST CASH IN FUND PORTFOLIO </p>
        <p> The fund invest user cash into equity (stocks, bonds, etc) </p>
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
          <p className="">
            {" "}
            STEP 1 - User invest (subscribe) cash to the fund.
          </p>
          <p>
            {" "}
            The process restarts, shares are issues based on cash investment
            divided by NAV per share
          </p>
          <button
            className="bg-gray-200 p-2 rounded-md my-2 hover:bg-green-400"
            onClick={() => {
              console.log(subscription / nav[0].nav_per_share);
              updateUserShares(subscription / nav[0].nav_per_share);
              updateCash(subscription * user.length);
              updateTotalNav(subscription * user.length);
              updateTotalShare(
                (subscription / nav[0].nav_per_share) * user.length
              );
            }}
          >
            Users subscribe cash AGAIN
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

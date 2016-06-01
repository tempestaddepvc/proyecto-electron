// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import React from "react";
import ReactDOM from "react-dom";

import Header from "./components/layout/header.js";

const app = document.getElementById('app');
ReactDOM.render(<Header/>, app);

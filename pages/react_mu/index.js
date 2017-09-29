import React from 'react';
import Head from 'next/head'
import App from './App_mu'
class Index extends React.Component{
	render=()=>{
		return(<div>
			<Head>
			  <title>2048</title>
		      <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
		      <link rel="stylesheet" type="text/css" href="/static/bootstrap.min.css" />
	    	  <link rel="stylesheet" type="text/css" href="/static/bootstrap-theme.min.css" />
	    	  <link rel="stylesheet" type="text/css" href="/static/react-datetime.css" />
	    	  <link rel="stylesheet" type="text/css" href="/static/react-select.css" />
	    	 </Head>
	    	 <App />
	    	 </div>);
	}
}
export default Index
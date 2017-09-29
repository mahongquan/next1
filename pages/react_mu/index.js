import React from 'react';
import Head from 'next/head'
import App from './App_mu'
class Index extends React.Component{
	render=()=>{
		return(<div>
			<Head>
			  <title>material-ui parts</title>
		      <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
	    	 </Head>
	    	 <App />
	    	 </div>);
	}
}
export default Index
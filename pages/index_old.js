import React from 'react';
import Head from 'next/head'
import App from './bs4/App'
class Index extends React.Component{
	render=()=>{
		return(<div>
			<Head>
			  <title>next parts</title>
		      <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
	    	 </Head>
	    	 <App />
	    	 </div>);
	}
}
export default Index
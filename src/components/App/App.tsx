import * as React from 'react';
import {Route,Link, Switch,Redirect} from 'react-router-dom';
import './App.css';
import {ROUTES, URL_ROUTES,Routes} from './routes';

interface AppState{}
interface AppProps {}

export class App extends React.Component<AppProps, AppState>{

  renderRoute = (oneRoute: Routes, i: number)=> {   
      return <Route
        key={i}
        exact={oneRoute.exact}
        path={oneRoute.path}
        render={(props) => oneRoute.render({ ...props })} />
   
  }
  render(){
    return(
      <Switch>
        {ROUTES.map((render, i) =>this.renderRoute(render, i))}            
         {/* <Redirect  to='/react-app-millionaire' /> */}
      </Switch>
      
    );
  } 
}



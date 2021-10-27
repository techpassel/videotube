import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/auth/AuthScreen';
import UserScreen from './screens/user/UserScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='content'>
        <Switch>
          <Route path='/' component={HomeScreen} exact />
          <Route path="/user" component={UserScreen} />
          {/* <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} /> */}
          {/* Here '?' is used to make 'id' as optional.It has nothing to do with query string */}
          <Route path='/auth' component={AuthScreen} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

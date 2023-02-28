import CreateCar from './components/CreateCar';
import Home from './components/Home';
import Login from './components/Login';
import MyCars from './components/MyCars';
import Signup from './components/Signup';

export const routes=[
    {path:"/login",element:<Login />},
    {path:"/",element:<Login />},
    {path:"/home",element:<Home />},
    {path:"/signup",element:<Signup />},
    {path:"/create",element:<CreateCar />},
    {path:"/mycars",element:<MyCars />},
]
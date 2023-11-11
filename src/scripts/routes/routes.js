import Home from '../view/pages/home';
import Detail from '../view/pages/detail';
import Favorite from '../view/pages/favorite';

const routes = {
  '/': Home, // default page
  '/home': Home,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;

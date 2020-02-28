import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import Login from './pages/Login';
import Main from './pages/Main';

// precisa esta em volta de toda navegaçao
export default createAppContainer(
    // cria navegaçao entre 2 telas login 1, main 2, vai carregar em ordem...
    createSwitchNavigator({ 
        Login,
        Main,
    })
);

// createBottomTabNavigatior, MaterialTopTabNavigatior, DrawerNavigator
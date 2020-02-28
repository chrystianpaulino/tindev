import React from 'react';
import Routes from './routes';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App(){
  return (
    <Routes />
  );
}
// antes
// import Login from './pages/Login';
// import {
//   Text, View, StyleSheet
// } from 'react-native';

// export default function App(){
//   return (
//     <Login/>
//     // {javascript} {{objeto do javascript}}
//     // todo espaço possivel flex 1
//     // <View style={styles.container}>
//     //   <Text style={styles.text}>Thais é meu amor</Text>
//     // </View>
//   );
// }


// --------------- 

// modo que veio com aero function, 
// comentamos pra deixar de cima e ja deixou return la
// const App = () => {
//   return (
//     <Text>Thais é meu amor!!!</Text>
//   );
// };
// export default App;

// trocou para:

// export default function App(){
//   return (
//     // {javascript} {{objeto do javascript}}
//     // todo espaço possivel flex 1
//     <View style={styles.container}>
//       <Text style={styles.text}>Thais é meu amor</Text>
//     </View>
//   );
// }

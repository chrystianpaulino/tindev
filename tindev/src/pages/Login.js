import React, {useState, useEffect} from 'react';
import { 
    // View, 
    KeyboardAvoidingView,
    StyleSheet, 
    Image,
    TextInput,
    // Button mas vem com toda estilizaçao
    Text,
    TouchableOpacity,
    Platform,
} from 'react-native';

import logo from '../assets/logo.png';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default function Login( {navigation} ){

    const [user, setUser] = useState('');  // stado para passar variavel
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('Main', {user});
            }
        })
    }, []); // vazio para executar apenas uma vez

    async function handleLogin(){
        console.log(user);
        // header username, user const daqui
        const response = await api.post('/devs', {username: user});
        const {_id} = response.data;
        await AsyncStorage.setItem('user', _id);
        navigation.navigate('Main', {user: _id});
        console.log(_id);
    }

    return(
        // div = View
        <KeyboardAvoidingView 
            style={ styles.container }
            behavior='padding'
            enabled={Platform.OS === 'i'}
        >
            <Image source={logo}/>

            <TextInput 
                autoCapitalize="none"
                autoCorrect={false}
                placeholder='Digite seu usuário no Github'
                placeholderTextColor='#999'
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    input: {
        // altura
        height: 46,
        // ocupar toda largura possivel
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    button: {
        // altura
        height: 46,
        // ocupar toda largura possivel
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#f5f5f5',
        fontWeight: 'bold',
        fontSize: 18,
    }
}); 
import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import logoImg from '../../assets/logo.png';
import style from "./style";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function Incidents() {

    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    function navigationDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncindents() {
        const response = await api.get('incidents');
        setIncidents(response.data);
        setTotal(response.headers['x-total-count']);
    }

    useEffect(() => {
        loadIncindents();
    }, []);

    return (
        <View style={style.container}>
        
            <View style={style.header}>
                <Image source={logoImg} />
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>{total} casos</Text>.
                </Text> 
            </View>

            <Text style={style.title} >Bem Vindo!</Text>
            <Text style={style.description}>Escolha um dos casos abaixo e salve o dia.</Text> 

            <FlatList 
                data={incidents}
                style={style.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: incident }) => {
                    return (
                        <View style={style.incident}>
                            <Text style={style.incidentProperty}>ONG:</Text>
                            <Text style={style.incidentValue}>{incident.name}</Text>
        
                            <Text style={style.incidentProperty}>CASO:</Text>
                            <Text style={style.incidentValue}>{incident.title}</Text>
        
                            <Text style={style.incidentProperty}>VALOR:</Text>
                            <Text style={style.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL', }).format(incident.value)}</Text>                    
                            
                            <TouchableOpacity 
                                style={style.detailButton} 
                                onPress={() => navigationDetail(incident)}
                            >
                                <Text style={style.detailButtonText}>Ver mais detalhes</Text>
                                <Feather name='arrow-right' size={16} color="#e02041" />
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />

        </View>
    );
}
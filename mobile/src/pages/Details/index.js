import React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, Linking } from 'react-native';
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailCompose from 'expo-mail-composer';
import style from "./style";

export default function Detail() {

    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const valor = Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL', }).format(incident.value);
    const message = `Olá, ${incident.name}. Gostaria de contribuir com o caso ${incident.title} com ${valor}`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailCompose.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={style.container}>

            <View style={style.header}>
                
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color="#e02041" />
                </TouchableOpacity>

            </View>

            <View style={style.incident}>
                <Text style={[style.incidentProperty, {marginTop:0}]}>ONG:</Text>
                <Text style={style.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={style.incidentProperty}>CASO:</Text>
                <Text style={style.incidentValue}>{incident.title}</Text>

                <Text style={style.incidentProperty}>VALOR:</Text>
                <Text style={style.incidentValue}>{valor}</Text>  
            </View>

            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Salve o dia!</Text>
                <Text style={style.heroTitle}>Seja o herói desse caso.</Text>
                
                <Text style={style.heroDescription}>Entre em contato:</Text>
                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsApp}>
                        <Text style={style.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={sendMail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}
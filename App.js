
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const T = {
  en: {
    app:'Khadamat Masr', welcome:'Find services or offer your skills', lang:'العربية',
    customer:'Customer', worker:'Worker', login:'Login', phone:'Phone number', continue:'Continue',
    home:'Home', request:'Request', offers:'Offers', chat:'Chat', pay:'Pay', map:'Map',
    service:'Service needed', details:'Details', budget:'Budget EGP', post:'Post request',
    plumber:'Plumber needed in Cairo', electrician:'Electrician for apartment', cleaner:'Home cleaning',
    offer1:'Ahmed offered 350 EGP', offer2:'Mona offered 500 EGP', message:'Type message...',
    payment:'Payment options', cash:'Cash on delivery', card:'Card / Wallet soon',
    location:'Location feature', locationText:'Workers near you will appear here.'
  },
  ar: {
    app:'خدمات مصر', welcome:'اطلب خدمة أو قدم مهارتك بسهولة', lang:'English',
    customer:'عميل', worker:'مقدم خدمة', login:'تسجيل الدخول', phone:'رقم الهاتف', continue:'متابعة',
    home:'الرئيسية', request:'طلب', offers:'العروض', chat:'الشات', pay:'الدفع', map:'الخريطة',
    service:'الخدمة المطلوبة', details:'التفاصيل', budget:'الميزانية بالجنيه', post:'نشر الطلب',
    plumber:'محتاج سباك في القاهرة', electrician:'كهربائي لشقة', cleaner:'تنظيف منزل',
    offer1:'أحمد قدم عرض ٣٥٠ جنيه', offer2:'منى قدمت عرض ٥٠٠ جنيه', message:'اكتب رسالة...',
    payment:'طرق الدفع', cash:'كاش عند الاستلام', card:'كارت / محفظة قريباً',
    location:'ميزة الموقع', locationText:'مقدمي الخدمات القريبين سيظهرون هنا.'
  }
};

export default function App() {
  const [lang, setLang] = useState('ar');
  const [role, setRole] = useState('customer');
  const [screen, setScreen] = useState('home');
  const [logged, setLogged] = useState(false);
  const [service, setService] = useState('');
  const [details, setDetails] = useState('');
  const [budget, setBudget] = useState('');
  const t = T[lang];

  if (!logged) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="auto" />
        <View style={styles.center}>
          <Text style={styles.logo}>خ</Text>
          <Text style={styles.title}>{t.app}</Text>
          <Text style={styles.sub}>{t.welcome}</Text>
          <TouchableOpacity style={styles.lang} onPress={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
            <Text style={styles.langText}>{t.lang}</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.role, role==='customer'&&styles.active]} onPress={()=>setRole('customer')}><Text>{t.customer}</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.role, role==='worker'&&styles.active]} onPress={()=>setRole('worker')}><Text>{t.worker}</Text></TouchableOpacity>
          </View>
          <TextInput style={styles.input} placeholder={t.phone} keyboardType="phone-pad" />
          <TouchableOpacity style={styles.button} onPress={() => setLogged(true)}>
            <Text style={styles.buttonText}>{t.continue}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const jobs = [t.plumber, t.electrician, t.cleaner];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t.app}</Text>
        <TouchableOpacity onPress={() => setLang(lang === 'ar' ? 'en' : 'ar')}><Text style={styles.switch}>{t.lang}</Text></TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {screen === 'home' && (
          <>
            <Text style={styles.h1}>{role === 'customer' ? t.customer : t.worker}</Text>
            {jobs.map((j,i)=>(
              <View key={i} style={styles.card}>
                <Text style={styles.cardTitle}>{j}</Text>
                <Text style={styles.cardText}>{i === 0 ? 'Cairo • Today' : 'Egypt • Open'}</Text>
                {role === 'worker' && <TouchableOpacity style={styles.smallBtn}><Text style={styles.smallText}>Send Offer</Text></TouchableOpacity>}
              </View>
            ))}
          </>
        )}

        {screen === 'request' && (
          <View>
            <Text style={styles.h1}>{t.request}</Text>
            <TextInput style={styles.input} placeholder={t.service} value={service} onChangeText={setService} />
            <TextInput style={[styles.input, styles.bigInput]} placeholder={t.details} value={details} onChangeText={setDetails} multiline />
            <TextInput style={styles.input} placeholder={t.budget} value={budget} onChangeText={setBudget} keyboardType="number-pad" />
            <TouchableOpacity style={styles.button} onPress={() => Alert.alert(t.app, 'Request posted')}>
              <Text style={styles.buttonText}>{t.post}</Text>
            </TouchableOpacity>
          </View>
        )}

        {screen === 'offers' && (
          <>
            <Text style={styles.h1}>{t.offers}</Text>
            <View style={styles.card}><Text style={styles.cardTitle}>{t.offer1}</Text><Text>⭐ 4.8</Text></View>
            <View style={styles.card}><Text style={styles.cardTitle}>{t.offer2}</Text><Text>⭐ 4.6</Text></View>
          </>
        )}

        {screen === 'chat' && (
          <>
            <Text style={styles.h1}>{t.chat}</Text>
            <View style={styles.chatBubble}><Text>Hello, I can come today.</Text></View>
            <View style={styles.chatBubble2}><Text>تمام، السعر كام؟</Text></View>
            <TextInput style={styles.input} placeholder={t.message} />
          </>
        )}

        {screen === 'pay' && (
          <>
            <Text style={styles.h1}>{t.payment}</Text>
            <View style={styles.card}><Text style={styles.cardTitle}>{t.cash}</Text></View>
            <View style={styles.card}><Text style={styles.cardTitle}>{t.card}</Text></View>
          </>
        )}

        {screen === 'map' && (
          <>
            <Text style={styles.h1}>{t.location}</Text>
            <View style={styles.mapBox}><Text>{t.locationText}</Text></View>
          </>
        )}
      </ScrollView>

      <View style={styles.nav}>
        {['home','request','offers','chat','pay','map'].map(s => (
          <TouchableOpacity key={s} onPress={()=>setScreen(s)} style={styles.navBtn}>
            <Text style={[styles.navText, screen===s&&styles.navActive]}>{t[s]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#f7f7f7'},
  center:{flex:1,justifyContent:'center',padding:24,alignItems:'center'},
  logo:{fontSize:44,backgroundColor:'#15803d',color:'#fff',width:80,height:80,textAlign:'center',borderRadius:20,paddingTop:12,marginBottom:15},
  title:{fontSize:30,fontWeight:'800'}, sub:{fontSize:16,color:'#555',marginVertical:10,textAlign:'center'},
  lang:{padding:10}, langText:{color:'#15803d',fontWeight:'700'},
  row:{flexDirection:'row',gap:10,marginVertical:15}, role:{padding:12,borderRadius:12,backgroundColor:'#eee'}, active:{backgroundColor:'#bbf7d0'},
  input:{width:'100%',backgroundColor:'#fff',padding:14,borderRadius:14,marginVertical:8,borderWidth:1,borderColor:'#ddd'},
  bigInput:{height:110,textAlignVertical:'top'}, button:{backgroundColor:'#15803d',padding:16,borderRadius:14,width:'100%',alignItems:'center',marginTop:10},
  buttonText:{color:'#fff',fontWeight:'800'}, header:{padding:16,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff'},
  headerTitle:{fontSize:22,fontWeight:'800'}, switch:{color:'#15803d',fontWeight:'700'}, content:{padding:16},
  h1:{fontSize:24,fontWeight:'800',marginBottom:12}, card:{backgroundColor:'#fff',padding:16,borderRadius:16,marginBottom:12,borderWidth:1,borderColor:'#eee'},
  cardTitle:{fontSize:17,fontWeight:'700'}, cardText:{color:'#666',marginTop:4}, smallBtn:{backgroundColor:'#15803d',padding:10,borderRadius:10,marginTop:10,alignSelf:'flex-start'},
  smallText:{color:'#fff'}, chatBubble:{backgroundColor:'#fff',padding:14,borderRadius:14,marginBottom:10,alignSelf:'flex-start'},
  chatBubble2:{backgroundColor:'#bbf7d0',padding:14,borderRadius:14,marginBottom:10,alignSelf:'flex-end'},
  mapBox:{height:260,backgroundColor:'#e5e7eb',borderRadius:20,alignItems:'center',justifyContent:'center',padding:20},
  nav:{flexDirection:'row',justifyContent:'space-around',padding:8,backgroundColor:'#fff',borderTopWidth:1,borderColor:'#eee'},
  navBtn:{padding:6}, navText:{fontSize:12,color:'#777'}, navActive:{color:'#15803d',fontWeight:'800'}
});

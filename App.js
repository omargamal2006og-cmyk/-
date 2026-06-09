import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const FREE_JOBS = 5;
const SERVICE_COMMISSION = 0.10;
const PRODUCT_COMMISSION = 0.05;

const T = {
  en: {
    app: 'Khadamat Masr', lang: 'العربية',
    customer: 'Customer', provider: 'Provider', seller: 'Seller',
    phone: 'Phone number', continue: 'Continue',
    home: 'Home', services: 'Services', request: 'Request', store: 'Store', cart: 'Cart', earnings: 'Earnings',
    welcome: 'Services and products in one app',
    first5: 'First 5 completed service jobs are free. After that, app takes 10%.',
    productsFee: 'Product sales commission: 5%',
    serviceRequests: 'Service Requests',
    postRequest: 'Post Service Request',
    title: 'Title', details: 'Details', budget: 'Budget EGP', post: 'Post',
    sendOffer: 'Send Offer',
    products: 'Products', addCart: 'Add to Cart', checkout: 'Checkout',
    completedJobs: 'Completed Jobs', freeLeft: 'Free Jobs Left',
    appGets: 'App Gets', providerGets: 'Provider Gets', sellerGets: 'Seller Gets'
  },
  ar: {
    app: 'خدمات مصر', lang: 'English',
    customer: 'عميل', provider: 'مقدم خدمة', seller: 'بائع',
    phone: 'رقم الهاتف', continue: 'متابعة',
    home: 'الرئيسية', services: 'الخدمات', request: 'طلب', store: 'المتجر', cart: 'السلة', earnings: 'الأرباح',
    welcome: 'خدمات ومنتجات في تطبيق واحد',
    first5: 'أول ٥ خدمات مكتملة مجاناً. بعد ذلك التطبيق يأخذ ١٠٪.',
    productsFee: 'عمولة بيع المنتجات: ٥٪',
    serviceRequests: 'طلبات الخدمات',
    postRequest: 'نشر طلب خدمة',
    title: 'العنوان', details: 'التفاصيل', budget: 'الميزانية بالجنيه', post: 'نشر',
    sendOffer: 'إرسال عرض',
    products: 'المنتجات', addCart: 'إضافة للسلة', checkout: 'الدفع',
    completedJobs: 'الخدمات المكتملة', freeLeft: 'الخدمات المجانية المتبقية',
    appGets: 'التطبيق يأخذ', providerGets: 'مقدم الخدمة يستلم', sellerGets: 'البائع يستلم'
  }
};

const serviceJobs = [
  { id: 1, en: 'Need plumber in Cairo', ar: 'محتاج سباك في القاهرة', price: 500 },
  { id: 2, en: 'Electrician for apartment', ar: 'كهربائي للشقة', price: 650 },
  { id: 3, en: 'Home cleaning', ar: 'تنظيف منزل', price: 800 }
];

const products = [
  { id: 1, en: 'Tool Kit', ar: 'عدة أدوات', price: 750 },
  { id: 2, en: 'Cleaning Pack', ar: 'باكدج تنظيف', price: 300 },
  { id: 3, en: 'LED Lamp', ar: 'لمبة LED', price: 120 }
];

export default function App() {
  const [lang, setLang] = useState('ar');
  const [role, setRole] = useState('customer');
  const [logged, setLogged] = useState(false);
  const [screen, setScreen] = useState('home');
  const [cart, setCart] = useState([]);
  const [completedJobs] = useState(3);
  const t = T[lang];

  const jobPrice = 1000;
  const freeLeft = Math.max(FREE_JOBS - completedJobs, 0);
  const appServiceCut = completedJobs < FREE_JOBS ? 0 : jobPrice * SERVICE_COMMISSION;
  const providerGets = jobPrice - appServiceCut;

  const cartTotal = cart.reduce((sum, p) => sum + p.price, 0);
  const appProductCut = cartTotal * PRODUCT_COMMISSION;
  const sellerGets = cartTotal - appProductCut;

  if (!logged) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="auto" />
        <View style={styles.center}>
          <Text style={styles.logo}>خ</Text>
          <Text style={styles.title}>{t.app}</Text>
          <Text style={styles.sub}>{t.welcome}</Text>

          <TouchableOpacity onPress={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
            <Text style={styles.lang}>{t.lang}</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            {['customer', 'provider', 'seller'].map(r => (
              <TouchableOpacity key={r} style={[styles.role, role === r && styles.active]} onPress={() => setRole(r)}>
                <Text>{t[r]}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput style={styles.input} placeholder={t.phone} keyboardType="phone-pad" />
          <TouchableOpacity style={styles.button} onPress={() => setLogged(true)}>
            <Text style={styles.buttonText}>{t.continue}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t.app}</Text>
        <TouchableOpacity onPress={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
          <Text style={styles.lang}>{t.lang}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {screen === 'home' && (
          <>
            <Text style={styles.h1}>{t.welcome}</Text>
            <View style={styles.card}><Text style={styles.bold}>{t.first5}</Text></View>
            <View style={styles.card}><Text style={styles.bold}>{t.productsFee}</Text></View>
          </>
        )}

        {screen === 'services' && (
          <>
            <Text style={styles.h1}>{t.serviceRequests}</Text>
            {serviceJobs.map(j => (
              <View key={j.id} style={styles.card}>
                <Text style={styles.cardTitle}>{lang === 'ar' ? j.ar : j.en}</Text>
                <Text>{j.price} EGP</Text>
                <TouchableOpacity style={styles.smallBtn} onPress={() => Alert.alert(t.app, 'Offer sent')}>
                  <Text style={styles.smallText}>{t.sendOffer}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        {screen === 'request' && (
          <>
            <Text style={styles.h1}>{t.postRequest}</Text>
            <TextInput style={styles.input} placeholder={t.title} />
            <TextInput style={[styles.input, styles.bigInput]} placeholder={t.details} multiline />
            <TextInput style={styles.input} placeholder={t.budget} keyboardType="number-pad" />
            <TouchableOpacity style={styles.button} onPress={() => Alert.alert(t.app, 'Request posted')}>
              <Text style={styles.buttonText}>{t.post}</Text>
            </TouchableOpacity>
          </>
        )}

        {screen === 'store' && (
          <>
            <Text style={styles.h1}>{t.products}</Text>
            {products.map(p => (
              <View key={p.id} style={styles.card}>
                <Text style={styles.cardTitle}>{lang === 'ar' ? p.ar : p.en}</Text>
                <Text>{p.price} EGP</Text>
                <TouchableOpacity style={styles.smallBtn} onPress={() => setCart([...cart, p])}>
                  <Text style={styles.smallText}>{t.addCart}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        {screen === 'cart' && (
          <>
            <Text style={styles.h1}>{t.cart}</Text>
            {cart.map((p, i) => (
              <View key={i} style={styles.card}>
                <Text style={styles.cardTitle}>{lang === 'ar' ? p.ar : p.en}</Text>
                <Text>{p.price} EGP</Text>
              </View>
            ))}
            <View style={styles.card}>
              <Text>Total: {cartTotal} EGP</Text>
              <Text>{t.appGets}: {appProductCut} EGP</Text>
              <Text>{t.sellerGets}: {sellerGets} EGP</Text>
            </View>
          </>
        )}

        {screen === 'earnings' && (
          <>
            <Text style={styles.h1}>{t.earnings}</Text>
            <View style={styles.card}>
              <Text>{t.completedJobs}: {completedJobs}</Text>
              <Text>{t.freeLeft}: {freeLeft}</Text>
              <Text>{t.appGets}: {appServiceCut} EGP</Text>
              <Text>{t.providerGets}: {providerGets} EGP</Text>
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.nav}>
        {['home','services','request','store','cart','earnings'].map(s => (
          <TouchableOpacity key={s} onPress={() => setScreen(s)} style={styles.navBtn}>
            <Text style={[styles.navText, screen === s && styles.navActive]}>{t[s]}</Text>
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
  title:{fontSize:30,fontWeight:'800'},
  sub:{fontSize:16,color:'#555',marginVertical:10,textAlign:'center'},
  lang:{color:'#15803d',fontWeight:'800',padding:10},
  row:{flexDirection:'row',gap:8,marginVertical:15},
  role:{padding:10,borderRadius:12,backgroundColor:'#eee'},
  active:{backgroundColor:'#bbf7d0'},
  input:{width:'100%',backgroundColor:'#fff',padding:14,borderRadius:14,marginVertical:8,borderWidth:1,borderColor:'#ddd'},
  bigInput:{height:110,textAlignVertical:'top'},
  button:{backgroundColor:'#15803d',padding:16,borderRadius:14,width:'100%',alignItems:'center',marginTop:10},
  buttonText:{color:'#fff',fontWeight:'800'},
  header:{padding:16,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#fff'},
  headerTitle:{fontSize:22,fontWeight:'800'},
  content:{padding:16},
  h1:{fontSize:24,fontWeight:'800',marginBottom:12},
  card:{backgroundColor:'#fff',padding:16,borderRadius:16,marginBottom:12,borderWidth:1,borderColor:'#eee'},
  cardTitle:{fontSize:17,fontWeight:'700'},
  bold:{fontWeight:'800'},
  smallBtn:{backgroundColor:'#15803d',padding:10,borderRadius:10,marginTop:10,alignSelf:'flex-start'},
  smallText:{color:'#fff'},
  nav:{flexDirection:'row',justifyContent:'space-around',padding:8,backgroundColor:'#fff',borderTopWidth:1,borderColor:'#eee'},
  navBtn:{padding:5},
  navText:{fontSize:11,color:'#777'},
  navActive:{color:'#15803d',fontWeight:'800'}
});

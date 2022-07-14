import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";
import MyInputText from "../../components/MyInputText";

import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();



const AllRep_Trat = ({navigation}) => {
  // permite guardar una constante de Tratamiento

  const [Nomsearch, setNomSearch] = useState("");
  const [Repuesto, setRepuesto] = useState([]);

  



  // Secuencia sql que devuelve todos los repuestos asociados a un tratamiento
  const searchTratamiento = () => {
    console.log("searchRepuesto");

    // Valida que el campo tenga algun dato
    if (!Nomsearch.trim()) {
      Alert.alert("El nombre del Repuesto es requerido");
      return;
    }
    // Secuencia SQL que permite buscar los repuestos asociados a un tratamiento ingresado y guardar sus datos
    db.transaction((tx) => {
      tx.executeSql(
       
        "SELECT * FROM Trat_repuesto WHERE T_name = ?",
        [Nomsearch],
        (tx, results) => {
            if (results.rows.length > 0) {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));
                  setRepuesto(temp);
              } else {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));
                  setRepuesto(temp);
                Alert.alert(
                  
                  "Mensaje",
                  "No hay Repuesto para este Tratamiento!!!",
                  [
                    {
                      text: "Ok",
                   
                    },
                  ],
                  { cancelable: false }
                );
              }
            });
          }),
        [] } ;



 
// por cada repuesto asociados a un tratamiento se guarda una lista con sus datos que es llamada en un contendor
  const listItemView = (item) => {
    return (

      <View key={item.id} style={styles.listItemView}>
        <MyText text="Tratamiento:"   style={styles.text}>   </MyText>
        <MyText text={item.T_name}   style={styles.text}>   </MyText>

        <MyText text="Repuesto:"   style={styles.text}>   </MyText>
        <MyText text={item.R_name}   style={styles.text}>   </MyText>

        <MyText text="Cantidad:" style={styles.text}/>
        <MyText text={item.cantidad } style={styles.text}/>



      </View>
    );
  };

  //Contenedor donde se muestran todos los repuestos asociados a un tratamiento
  return (
    <><MyText text="Buscar los Repuestos utilizados en el Tratamiento" style={styles.Title} /><SafeAreaView style={styles.container}>
      <View>
        <View>
   
                          <MyInputText
                              placeholder="Ingrese el nombre del Tratamiento"
                              style={styles.inputStyle}
                              onChangeText={(text) => setNomSearch(text)} />
                          <MySingleButton title="Buscar" customPress={searchTratamiento} />
            


          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={Repuesto}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)} />


        </View>

      </View>


      
    </SafeAreaView></>

  );
};

export default AllRep_Trat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  listView: {
    marginTop: 20,
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    padding: 5,
    marginLeft: 10,
    color: "black",
    alignContent: "center",
    alignItems: "center",
  },
  Title:{
    fontSize: 20,
alignSelf: "center",
marginTop : 50,
marginBottom : 10
  },

  TextDrop: {
    fontSize: 15,
    padding: 5,
    marginLeft: 25,
  
  },
  
});

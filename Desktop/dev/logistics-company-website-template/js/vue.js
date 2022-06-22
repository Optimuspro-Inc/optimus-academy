const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Hello Vue!',
        search: false,
        parcelId: "",
        progress: null,
        data: null,
        }
    },
    methods: {
      submit() {
        fetch("https://ontime-shipping.herokuapp.com/api", {
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          method: "POST",
          body: JSON.stringify({
            query: `
             query{
                singleParcel(parcelId: "${this.parcelId}"){
                  locations{
                    location
                    _id
                  }
                  parcelName
                  transportMethod
                  deliveryDate
                  paymentMethod
                  insurance
                  weight
                  numberOfGoods
                  senderInfo{
                    name
                    email
                    address
                    city
                    country
                    phone
                    postCode
                  }
                  receiverInfo{
                    name
                    email
                    address
                    city
                    country
                    phone
                    postCode
                  }    
                }
              }
            `,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            // console.log(result.data.singleParcel);
            this.data = result.data.singleParcel;
            this.progress = result.data.singleParcel.locations;
            this.search = true;
          });
      }
    },
  }).mount('#app')
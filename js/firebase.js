var rootRef = firebase.database().ref().child("products");
var setUp = firebase.database().ref().child("settings");
var sliderUp = firebase.database().ref().child("slider");

rootRef.on("child_added", snap => { //get all data from Firebase
    var desp = snap.child("description").val();
    var image = snap.child("image").val();
    var productString = '<div class="card">'   //image section
         + '<img class="card-img-top" alt="Card image" style="width:50%" src="images/' + image + '">'
         +'<div class="card-body">'
         +'<div class="overlay"></div>'
         +'<div class="button" onClick=updateData(' 
         +snap.key+')><i class="fa fa-edit" style="font-size:24px"></i></div><div class="button" onClick=deleteData('
         +snap.key+')><span aria-hidden="true" style="font-size:40px">&times;</span></div>'
         +'<p class="card-text">"'+desp+'"</p>'
         + '</div>'
         + '</div>';
    
    $("#product_section").append(productString);
});

setUp.on("child_added", snap => { //get about data from Firebase
    var about = snap.child("About").val();

    $("#about_para").append(about);
});

sliderUp.on("child_added", snap => { //get all slide from Firebase

    var image = snap.child("imageName").val();
    if(parseInt(snap.key) == 1) {
    var imageName = '<div class="item active">'   //image section
         + '<img src="images/' + image + '"alt="...">'
         + '<div class="carousel-caption">...</div>'
         + '</div>';
    } else {
    var imageName = '<div class="item">'   //image section
        + '<img src="images/' + image + '"alt="...">'
        + '<div class="carousel-caption">...</div>'
        + '</div>';
    }
    $("#sliderShow").append(imageName);
});


function setttingUpdate(field_name){
    var field_tittle = "Update "+field_name;
  
    firebase.database().ref('settings/'+1).on('value', function(snapshot){
      var field_value = snapshot.child(field_name).val();
      var newValue = prompt(field_tittle, field_value);
      // user press cancle
      if (newValue == null) {
          console.log("cancle pressed");
      } else if (newValue == "") {
        window.alert("Field mustbe filled up");
      }
      else {
      // update the field with new value
      setUp.child('1')
      .update({ [field_name]: newValue })
      .then(function () {
        alert("Yeah Updated!!");
        location.reload();  //reload to load all the data
        return false;
      })
      .catch(function (error) {
        console.log('Update failed: ' + error.message);
      });
    }
    });
  }

function addMoreSlide() {
  document.getElementById("addSlide").style.display = "block";
  const sNo = document.getElementById('slideNo');
  const sName = document.getElementById('slideName');
  const newSlide = document.getElementById('addSlide');
  
  newSlide.addEventListener('click', (e) => { // write data into Firebase
    e.preventDefault();
    sliderUp.child(sNo.value).set({
      imageName: sName.value
    });
    sNo.value='';   // Clear all the field to ready for next input
    sName.value='';

    location.reload();  //reload to load all the product
    return false;
  });
}

function addMorePro() {
  document.getElementById("product_add").style.display = "block";
  const productId = document.getElementById('id_field');
  const desp = document.getElementById('product_field');
  const img = document.getElementById('image_field');
  const newProduct = document.getElementById('addProduct');

      newProduct.addEventListener('click', (e) => { // write data into Firebase
        e.preventDefault();
        rootRef.child(productId.value).set({
          description: desp.value,
          image: img.value
        });
        productId.value='';   // Clear all the field to ready for next input
        desp.value='';
        img.value='';
  
        location.reload();  //reload to load all the product
        return false;
      });
}

  // cancle the requried section
  function cancle(section){
    document.getElementById(section).style.display = "none";
  }

  function updateData(key) {
    document.getElementById("update").style.display = "block";
    window.scrollTo(0,document.body.scrollHeight);
    var productUp = document.getElementById("product_up");
    var imageUp = document.getElementById("image_up");
    var updatePro = document.getElementById("updatePro");
  
    // show value of description and image in input field
    firebase.database().ref('products/'+key).on('value', function(snapshot){
      productUp.value = snapshot.val().description;
      imageUp.value = snapshot.val().image;
    });
  
    updatePro.addEventListener('click', (e) => { // Update data into Firebase
      e.preventDefault();
      if(productUp.value == "" || imageUp.value == ""){
        alert("All field must be filled out");
        return false;
      }
      rootRef
        .child(key)
        .update({ description: productUp.value,
          image: imageUp.value })
        .then(function () {
          alert("Product Updated!!");
          location.reload();  //reload to load all the product
          return false;
        })
        .catch(function (error) {
          console.log('Update failed: ' + error.message);
        });
    });
  }
  function deleteData(key) {
    if (confirm("The Product will be Removed!")) {
      //remove that product from database
      rootRef
        .child(key)
        .remove()
        .then(function () {
          console.log('Remove succeeded.');
        })
        .catch(function (error) {
          console.log('Remove failed: ' + error.message);
        });
        location.reload();  //reload to load updated products
        return false;
    } else {
      //disapper the alert box
    }
  }
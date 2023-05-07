import React, { useState } from "react";
import axios from "axios";
import "./create.css";
import { createObjectURL } from 'blob-util';
import { useHistory } from "react-router-dom";


import { IoIosAddCircleOutline } from "react-icons/io";

export const Create = () => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher la page de se recharger lors de la soumission du formulaire

    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("body", body);
    // formData.append("image", image);

    // try {
    //   const response = await axios.post("http://localhost:3301/blog", formData, {
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error.toJSON());
    // }
    // event.preventDefault();
    // const data = {
    //   title: title,
    //   body: body,
    //   image: image
    // };

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    //     "Access-Control-Allow-Headers": "Content-Type, Authorization"
    //   }
    // };

    // try {
    //   const response = await axios.post("http://localhost:3301/blog", JSON.stringify(data), config);
    // } catch (error) { console.log(error.toJSON()) }
    // //console.log(response.data);


    /*  ce code marche a 100%
    axios.post('http://localhost:3301/blog', {
      title: "Mon nouveau post",
      body: "Le contenu de mon nouveau post",
      // image: image // Fichier image à envoyer en tant que pièce jointe
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    */
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image", image);

    // try {
    //   const response = await axios.post("http://localhost:3301/blog/article", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     },
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error.toJSON());
    // }

    try {
      const response = await fetch('http://localhost:3301/blog/article', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Article créé avec succès!');
        history.push("/");
      } else {
        console.log('Erreur lors de la création de l\'article.');
      }
    } catch (error) {
      console.log(error.message);
    }



    // Reset form fields after submission
    setTitle("");
    setBody("");
    setImage(null);
  };




  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <label>
  //       Titre:
  //       <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
  //     </label>
  //     <br />
  //     <label>
  //       Contenu:
  //       <textarea value={body} onChange={(e) => setBody(e.target.value)} />
  //     </label>
  //     <br />
  //     <label>
  //       Image:
  //       <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
  //     </label>
  //     <br />
  //     <button type="submit">Envoyer</button>
  //   </form>
  // );

  return (
    <>
      <section className="newPost">
        <div className="container boxItems">
          {<div className="img ">
            {
              image ? (
                <img
                  src={createObjectURL(image)}
                  alt="image"
                  className="image-preview"
                />
              ) : (
                <img
                  src="https://images.pexels.com/photos/6424244/pexels-photo-6424244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="image"
                  className="image-preview"
                />
              )
            }
          </div>}
          <form onSubmit={handleSubmit}>
            {<div className="inputfile flexCenter">
              <input
                type="file"
                accept="image/*"
                alt="img"
                onChange={handleImageChange}

              />
            </div>}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={body}
              onChange={(event) => setBody(event.target.value)}
            ></textarea>

            <button type="submit" className="button">Create Post</button>
          </form>
        </div>
      </section>
    </>
  );
}


// import React, { useState } from "react";
// import axios from "axios";
// import "./create.css";
// import { createObjectURL } from 'blob-util';

// import { IoIosAddCircleOutline } from "react-icons/io";

// export const Create = () => {
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [image, setImage] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault(); // Empêcher la page de se recharger lors de la soumission du formulaire

//     console.log('handleSubmit() called!'); // Ajouter console.log()

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("body", body);
//     formData.append("image", image);

//     try {
//       const response = await fetch('http://localhost:3301/blog/article', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         console.log('Article créé avec succès!'); // Ajouter console.log()
//       } else {
//         console.log('Erreur lors de la création de l\'article.'); // Ajouter console.log()
//       }
//     } catch (error) {
//       console.log(error.message);
//     }

//     // Reset form fields after submission
//     setTitle("");
//     setBody("");
//     setImage(null);
//   };

//   const handleImageChange = (event) => {
//     setImage(event.target.files[0]);
//   };

//   console.log('rendering form...'); // Ajouter console.log()

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Titre:
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Contenu:
//         <textarea value={body} onChange={(e) => setBody(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Image:
//         <input type="file" accept="image/*" onChange={handleImageChange} />
//       </label>
//       <br />
//       <button type="submit">Envoyer</button>
//     </form>
//   );
// };

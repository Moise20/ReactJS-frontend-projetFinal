import React, { useState, useEffect } from "react";
import "./create.css";
import { createObjectURL } from 'blob-util';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import userEvent from "@testing-library/user-event";
export const Edit = () => {


  const { id } = useParams();
  const history = useHistory();
  console.log(id);
  const [useredit, setUseredit] = useState({ title: '', body: '', image: '' });
  const handleReset = () => {
    setUseredit({ title: '', body: '', image: '' });
    setImage(null);
    setImageUrl(null);
  }

  useEffect(() => {
    const edituser = async () => {
      const reqdata = await fetch(`http://localhost:3301/blog/${id}`);
      const res = await reqdata.json();
      setUseredit(res);
    }
    edituser();
  }, [id]);

  const [msg, setMsg] = useState("");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher la page de se recharger lors de la soumission du formulaire


    const formData = new FormData();
    formData.append("title", useredit.title);
    formData.append("body", useredit.body);
    formData.append("image", image);
    console.log("formData", formData);



    try {
      const response = await fetch(`http://localhost:3301/blog/${id}`, {
        method: 'PUT',
        body: formData,

      });
      console.log(JSON.parse(JSON.stringify(formData)))

      if (response.ok) {
        // // Reset form fields after submission
        // setTitle("");
        // setBody("");
        // setImage(null);
        console.log('Article modifié avec succès!');
        handleReset(); // Appel de la fonction de réinitialisation après la soumission réussie
        history.push("/");

      } else {
        console.log('Erreur lors de la modification de l\'article.');
      }
    } catch (error) {
      console.log(error.message);
    }




  };




  // const handleImageChange = (event) => {
  //   setImage(event.target.files[0]);
  // };

  // const handleTitleChange = (event) => {
  //   setTitle(event.target.value);
  // }

  // const handleBodyChange = (event) => {
  //   setBody(event.target.value);
  // }

  // const handleImageChange = (event) => {
  //   setUseredit({ ...useredit, image: event.target.files[0] });
  // };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImageUrl(createObjectURL(selectedImage));
    console.log("image", selectedImage);
  };
  const handleTitleChange = (event) => {
    setUseredit({ ...useredit, title: event.target.value });
    console.log("title", useredit.title);
  }

  const handleBodyChange = (event) => {
    setUseredit({ ...useredit, body: event.target.value });
    console.log("body", useredit.body);
  }

  const handleEdit = (e) => {
    setUseredit({ ...useredit, [e.target.name]: e.target.value });
  }

  // const handleArticleUpdate = async (e) => {
  //   e.preventDefault();
  //   const response = await axios.put(`http://localhost:3301/blog/${id}`, useredit);
  //   setMsg(response.data.msg);

  // }


  return (
    <>
      <section className="newPost">
        <div className="container boxItems">
          {<div className="img ">
            {imageUrl ? (
              <img src={imageUrl} alt="image" className="image-preview" />
            ) : (
              <img
                src="https://images.pexels.com/photos/6424244/pexels-photo-6424244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="image"
                className="image-preview"
              />
            )}
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
            {
              <div> <input
                type="text"
                placeholder="Title"
                value={useredit.title}
                onChange={(event => handleTitleChange(event))}
              //onChange={(event) => setTitle(event.target.value)}
              //onChange={(e) => handleEdit(e)}
              //onChange={(e) => setTitle({ title: e.target.value })}
              /></div>

            }


            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={useredit.body}
              onChange={handleBodyChange}
            //onChange={(event) => setBody(event.target.value)}
            //onChange={(e) => handleEdit(e)}
            //onChange={(e) => setBody({ body: e.target.value })}
            ></textarea>

            <button type="submit" className="button">Edit Post</button>
          </form>
        </div>
      </section>
    </>
  );
}


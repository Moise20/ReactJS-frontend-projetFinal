import React, { useState, useEffect } from "react";
import "./blog.css";
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt, AiOutlineEdit, AiOutlineDelete, AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import moment from "moment";
import { formatDistanceToNow, parseISO } from "date-fns";
import fr from 'date-fns/locale/fr';
import { format } from 'date-fns';



export const Card = () => {

  const [articles, setArticles] = useState([]);
  const [tag, setTag] = useState("");
  const [comment, setComment] = useState("");
  const [showCommentField, setShowCommentField] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [showTagInput, setShowTagInput] = useState(false);
  const [activeTagInputIndex, setActiveTagInputIndex] = useState(-1);
  const [tags, setTags] = useState([]);
  const [articleTags, setArticleTags] = useState([]);
  const [commentCounts, setCommentCounts] = useState({});
  const [likes, setLikes] = useState({})



  const handleAddTag = (index) => {
    setActiveTagInputIndex(index);
  };


  const renderTagInput = (item, index) => {
    const itemTags = tags[index] ? tags[index].split("#").slice(1) : [];
    if (activeTagInputIndex === index) {
      return (
        <div>
          <input type="text" placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
          <button onClick={() => submitTags(item, index)}>Ajouter</button>
        </div>
      );
    } else {
      return (
        <>
          {itemTags.map((tag) => (
            <span key={tag}>#{tag} </span>
          ))}
          <button onClick={() => handleAddTag(index)}>
            <AiOutlineTags />
          </button>
        </>
      );
    }
  };




  const submitTags = async (item, index) => {
    if (!tag) {
      alert("Veuillez entrer un tag.");
      return;
    }
    if (tag.includes(" ")) {
      alert("Le nom du tag ne peut pas contenir d'espaces.");
      return;
    }
    const response = await fetch(`http://localhost:3301/blog/tag/${tag}`, {
      method: "POST",
    });
    const data = await response.json();
    const response2 = await fetch(`http://localhost:3301/blog/${item.id}/tag/${data.id}`, {
      method: "PATCH",
    });
    const data2 = await response2.json();
    const newTags = [...tags];
    //newTags[index] = tag;
    newTags[index] = newTags[index] ? `${newTags[index]}#${tag}` : `#${tag}`;
    setTags(newTags);
    setTag("");
    setActiveTagInputIndex(-1);
    setShowTagInput(false);
  };



  const submitComment = async (item) => {
    if (!comment) {
      alert("Veuillez entrer un commentaire.");
      return;
    }
    const response = await fetch(`http://localhost:3301/blog/comment/${item.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: comment,
      }),
    });
    const data = await response.json();
    console.log(data);
    setComment("");

    const updatedArticles = articles.map((article) => {
      if (article.id === item.id) {
        return {
          ...article,
          showCommentField: false,
        };
      } else {
        return article;
      }
    });

    setArticles(updatedArticles);
  };



  const handleLikeClick = async (item) => {
    const response = await fetch(`http://localhost:3301/blog/${item.id}/like`, {
      method: 'POST'
    });

    if (response.ok) {
      const data = await response.json();
      setLikes(prevLikes => ({
        ...prevLikes,
        [item.id]: data.totalLikes
      }));
      console.log("likes", data)
      setLikes(data.totalLikes);
    }
  };



  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch("http://localhost:3301/blog");
      const data = await response.json();
      // pour chaque article, stocker le nombre de likes dans l'objet "likes" avec la clé étant l'ID de l'article

      // Ajouter la propriété "commentCount" et "tags" à chaque élément de "data"
      const updatedData = await Promise.all(data.map(async (item) => {
        const commentResponse = await fetch(`http://localhost:3301/blog/comment/count/${item.id}`);
        const commentData = await commentResponse.json();
        item.commentCount = commentData;
        item.createdAt = moment(item.createdAt).toISOString();

        const tagResponse = await fetch(`http://localhost:3301/blog/${item.id}/tags`);
        const tagData = await tagResponse.json();
        //console.log("item",item)
        //console.log("tagaData",tagData)
        //return tagData.map((tag) => tag.name);
        //item.tags = tagData;
        item.postTag = tagData.tags;
        item.showCommentField = false;
        console.log("item def", item)

        return item;
      }));
      setArticles(updatedData);
      //setArticles(tagResponse)
      setArticleTags(tags);
      setIsLoading(false);
    }
    fetchData();
  }, [likes]);



  return (
    <>
      <section className='blog'>
        <div className='container grid3'>
          {articles.map((item, index) => (
            <div className='box boxItems' key={index}>
              <div className='img'>
                <img src="{item.image}" alt='' />
              </div>
              <div className='details'>

                <div className="tag">
                  {/* <div className="card-tags">
                    {tags[index] ? (
                      <div className="tag"></div>
                    ) : (
                      <div className="tag-placeholder">Ajouter un tag</div>
                    )}
                    {renderTagInput(item, index)}
                  </div> */}
                  <div className="card-tags">
                    {item.hasOwnProperty("postTag") && item.postTag.length > 0 ? (
                      item.postTag.map((tag, tagIndex) => (

                        <span key={tagIndex}>#{tag.name}</span>

                      ))
                    ) : (
                      <div className="tag-placeholder">Ajouter un tag</div>
                    )}
                    {renderTagInput(item, index)}
                  </div>

                </div>
                <Link to={`/details/${item.id}`} className='link'>
                  <h3>{item.title}</h3>
                </Link>
                <p>{item.body.slice(0, 180)}...</p>
                <div className='date'>

                  <AiOutlineClockCircle className='icon' /> <label htmlFor=''>
                  {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                  </label>

                  <AiOutlineComment
                    className="icon"
                    onClick={() =>
                      setArticles(
                        articles.map((article) =>
                          article.id === item.id
                            ? { ...article, showCommentField: !article.showCommentField }
                            : article
                        )
                      )
                    }
                  />

                  {item.commentCount > 0 && (
                    <div>
                      <label htmlFor=''>{item.commentCount} comment{item.commentCount > 1 ? 's' : ''}</label>
                    </div>
                  )}

                  {item.showCommentField && (
                    <div className="comment-field">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Commentaires..."
                      />
                      <button onClick={() => submitComment(item)}>Submit</button>
                    </div>
                  )}






                  <AiOutlineLike className='icon' onClick={() => handleLikeClick(item)} />
                  <label>{item.likes} Like</label>




                  <AiOutlineDelete
                    className="icon"
                    onClick={() => {
                      if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
                        fetch(`http://localhost:3301/blog/${item.id}`, {
                          method: "DELETE",
                        }).then(() => {
                          setArticles(articles.filter((article) => article.id !== item.id));
                        });
                      }
                    }}
                  />

                  <label htmlFor="">Delete</label>
                </div>
                <div className="date2">
                  <Link to={`/edit/${item.id}`} className='link'> <AiOutlineEdit className="icon" /> <label htmlFor="">Edit</label> </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

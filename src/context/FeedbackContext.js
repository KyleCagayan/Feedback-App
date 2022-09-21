import React from "react";
import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // spinner
  const [feedback, setFeedback] = useState([]); //keeping an empty array
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {}, // empty obj by default, when clicked: ID rating and text will be placed into here
    edit: false, //boolean if edit is clicked, it will be set to true. if not clicked set to false
  });

  // useEffect is used so this is run when page loads
  useEffect(() => {
    fetchFeedback();
  }, []);

  //Fetch feedback
  const fetchFeedback = async () => {
    // "?_sort=id" is given by JSON server to sort data
    //"&_order=desc" means descending
    const response = await fetch(`/feedback?_sort=id&_order=desc`);
    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item, // fills with item
      edit: true,
    });
  };

  // add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    });

    // newFeedback.id = uuidv4(); JSON server creates ID automatically
    const data = await response.json()
    setFeedback([data, ...feedback]); // ... is a "spread operator", puts all things in object into array
  };

  // delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/feedback/${id}`, {method: 'DELETE'})

      setFeedback(feedback.filter((item) => item.id !== id)); //returns an array without the deleted card
    }
  };

  // update feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem)
    });

    const data = await response.json()

    // takes in id, and updated item
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
      //   passing in an item, for each feedback we're calling item
      //   for each one we're calling a condition asking is that item id equal to the id that is being passed that we want to update
      //   if so, we want to spread across the current item and updated item.
      // "..." is the spread syntax that enumerates the properties of an object. ~
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit, // the piece of state
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback, // the function of edit
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;

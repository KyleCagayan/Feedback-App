import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This is feedback item 1",
      rating: 10,
    },
    {
      id: 2,
      text: "This is feedback item 2",
      rating: 9,
    },
    {
      id: 3,
      text: "This is feedback item 3",
      rating: 7,
    },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {}, // empty obj by default, when clicked: ID rating and text will be placed into here
    edit: false, //boolean if edit is clicked, it will be set to true. if not clicked set to false
  });

  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item, // fills with item
      edit: true,
    });
  };

  // add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]); // ... is a "spread operator", puts all things in object into array
  };

  // delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id != id)); //returns an array without the deleted card
    }
  };

  // update feedback item
  const updateFeedback = (id, updItem) => {
    // takes in id, and updated item
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
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

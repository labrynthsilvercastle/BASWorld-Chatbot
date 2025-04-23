import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./FAQPage.css";
import CustomerElements from "../CustomerSupportPanel/CustomerElements.jsx";
import { CssBaseline, Box } from "@mui/material";
import {addQuestion, getAllQuestion} from "../apis/QuestionService.js";

const categories1 = [];

const DashboardTest = () => {
  let [categories, setCategories] = useState([categories1]);
  let [newQuestion, setNewQuestion] = useState("");
  let [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    getAllQuestion().then((result) => {
      setCategories(result);
    });
  }, []);

  const toggleFAQs = (categoryId) => {
    setCategories(
        categories.map((category) => {
          if (category.id === categoryId) {
            return { ...category, showFAQs: !category.showFAQs };
          }
          return category;
        })
    );
  };

  const handleEditFAQ = (categoryId, faqId) => {};

  const handleDeleteFAQ = (categoryId, faqId) => {};

  const toggleVisibility = (categoryId) => {
    setCategories(
        categories.map((category) => {
          if (category.id === categoryId) {
            return { ...category, isVisible: !category.isVisible };
          }
          return category;
        })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation if needed
    const newFaq = {
      id: `custom_faq_${Date.now()}`,
      question: newQuestion,
      answer: newAnswer,
    };
    addQuestion(newQuestion, newAnswer);
    const updatedCategories = [...categories];
    // updatedCategories[0].faqs.push(newFaq); // Assuming adding to the first category
    setCategories(updatedCategories);
    setNewQuestion("");
    setNewAnswer("");
    getAllQuestion().then((result) => {
      console.log(result);
      setCategories(result);
    });
  };
  if (categories === undefined) {
    return <div></div>;
  } else {
    return (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <CustomerElements />
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "100px" }}>
            <div>
              <h2>Frequently Asked Questions</h2>
              <table className="faq-table">
                <tbody>
                {categories.map((category) => (
                    <React.Fragment key={category.id}>
                      <tr className="faq-category">
                        <td>{category.description}</td>
                        <td className="toggle-buttons">
                          <button onClick={() => toggleVisibility(category.id)}>
                            <FontAwesomeIcon
                                icon={category.isVisible ? faEye : faEyeSlash}
                            />
                          </button>
                          <button onClick={() => toggleFAQs(category.id)}>
                            {category.showFAQs ? "▼" : "►"}
                          </button>
                        </td>
                      </tr>
                      {category.showFAQs &&
                          category.faqs.map((faq) => (
                              <tr key={faq.id} className="faq-item">
                                <td colSpan="2">
                                  <div>
                                    <span>{faq.question}</span>
                                    <button
                                        onClick={() =>
                                            handleEditFAQ(category.id, faq.id)
                                        }
                                    >
                                      Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteFAQ(category.id, faq.id)
                                        }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                  <div>
                                    <span>{faq.answer}</span>
                                  </div>
                                </td>
                              </tr>
                          ))}
                    </React.Fragment>
                ))}
                </tbody>
              </table>
              <h2>Add New Question</h2>
              <form className="form-container" onSubmit={handleSubmit}>
                <label>
                  Question:
                  <textarea
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      rows={4}
                  />
                </label>
                <label>
                  Answer:
                  <textarea
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      rows={6}
                  />
                </label>
                <button type="submit">Submit</button>
              </form>
            </div>
          </Box>
        </Box>
    );
  }
};

export default DashboardTest;

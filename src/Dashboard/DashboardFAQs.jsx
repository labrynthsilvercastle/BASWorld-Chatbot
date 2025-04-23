import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEdit } from "@fortawesome/free-solid-svg-icons";
import "./FAQPage.css";

const FAQPage = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchata();
    console.log("Happened");
  }, []);

  const fetchData = async () => {
    const response = axios
      .get("http://localhost:8080/bot")
      .then((response) => response.data);

    setCategories(response);
  };
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

  const handleEditFAQ = async (categoryId, faqId) => {
    try {
      await axios.delete(`http://localhost:8080/Faqs/${categoryId}/${faqId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };
  const handleEditCategory = async (categoryId, faqId) => {
    try {
      await axios.delete(`http://localhost:8080/Faqs/${categoryId}/${faqId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };
  const handleDeleteFAQ = async (categoryId, faqId) => {
    try {
      await axios.delete(`http://localhost:8080/Faqs/${categoryId}/${faqId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

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

  const handleCategoryChange = async (faqId, newCategoryId) => {
    try {
      console.log(
        `Changing category of FAQ with faqId: ${faqId} to category: ${newCategoryId}`
      );
      fetchData();
    } catch (error) {
      console.error("Error changing category:", error);
    }
  };

  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      <table className="faq-table">
        <tbody>
          {categories.map((question) => (
            <React.Fragment key={question.id}>
              <tr className="faq-category">
                <td>
                  {question.description}
                  <button onClick={() => handleEditCategory(category.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
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
                          onClick={() => handleEditFAQ(category.id, faq.id)}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteFAQ(category.id, faq.id)}
                        >
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            handleCategoryChange(faq.id, category.id)
                          }
                        >
                          Change Category
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
    </div>
  );
};

export default FAQPage;

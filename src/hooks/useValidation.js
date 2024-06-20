// const useValidation = (formData) => {
//     const validate = () => {
//       let errors = {};
  
//       // Full Name validation
//       if (!formData.fullName) {
//         errors.fullName = 'Full Name is required';
//       }
  
//       // Email validation with proper domain check
//       const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//       if (!formData.email) {
//         errors.email = 'Email is required';
//       } else if (!emailPattern.test(formData.email)) {
//         errors.email = 'Email is invalid';
//       }
  
//       // Phone Number validation
//       if (!formData.phoneNumber) {
//         errors.phoneNumber = 'Phone Number is required';
//       } else if (isNaN(formData.phoneNumber)) {
//         errors.phoneNumber = 'Phone Number must be a valid number';
//       }
  
//       // Relevant Experience validation
//       if ((formData.applyingFor === 'Developer' || formData.applyingFor === 'Designer') && (!formData.relevantExperience || formData.relevantExperience <= 0)) {
//         errors.relevantExperience = 'Relevant Experience is required and must be greater than 0';
//       }
  
//       // Portfolio URL validation
//       const urlPattern = /^(https?:\/\/)?([\w-]+.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/;
//       if (formData.applyingFor === 'Designer' && (!formData.portfolioUrl || !urlPattern.test(formData.portfolioUrl))) {
//         errors.portfolioUrl = 'Portfolio URL is required and must be a valid URL';
//       }
  
//       // Management Experience validation
//       if (formData.applyingFor === 'Manager' && !formData.managementExperience) {
//         errors.managementExperience = 'Management Experience is required';
//       }
  
//       // Additional Skills validation
//       if (!formData.additionalSkills || formData.additionalSkills.length === 0) {
//         errors.additionalSkills = 'At least one skill must be selected';
//       }
  
//       // Preferred Interview Time validation
//       if (!formData.preferredInterviewTime) {
//         errors.preferredInterviewTime = 'Preferred Interview Time is required';
//       }
  
//       return errors;
//     };
  
//     return validate;
//   };
  
//   export default useValidation;
  

const useValidation = (formData) => {
  const validate = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a number';
    }

    if ((formData.applyingFor === 'Developer' || formData.applyingFor === 'Designer') && (!formData.relevantExperience || formData.relevantExperience <= 0)) {
      errors.relevantExperience = 'Relevant Experience is required and must be a number greater than 0';
    }

    if (formData.applyingFor === 'Designer' && !formData.portfolioUrl.trim()) {
      errors.portfolioUrl = 'Portfolio URL is required';
    } else if (formData.applyingFor === 'Designer' && !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(formData.portfolioUrl)) {
      errors.portfolioUrl = 'Invalid URL';
    }

    if (formData.applyingFor === 'Manager' && !formData.managementExperience.trim()) {
      errors.managementExperience = 'Management Experience is required';
    }

    if (formData.additionalSkills.length === 0) {
      errors.additionalSkills = 'At least one skill must be selected';
    }

    if (!formData.preferredInterviewTime.trim()) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    }

    if (!formData.applyingFor.length === 0) {
      errors.applyingFor = 'Applying For is required';
    }

    return errors;
  };

  return validate;
};

export default useValidation;

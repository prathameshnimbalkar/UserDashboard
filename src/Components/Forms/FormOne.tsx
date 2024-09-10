import React, { useEffect } from "react";
import "./Form.css";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../Helper/FormContext";
import { useNavigation } from '../Helper/NavigationContext';

interface FormData {
  name: string;
  gender: string;
  age: number;
}

const FormOne: React.FC = () => {
  const navigate = useNavigate();
  const { setEdit, setHasUnsaved} = useNavigation();
  const { formData, setFormData, triggerValidation, setTriggerValidation,setCurrentStep  } = useFormContext();
  const { register,handleSubmit, control, formState: { errors }, trigger, reset} = useForm<FormData>({
    defaultValues: {
      name: formData.name ,
      gender: formData.gender || "",
      age: formData.age || undefined,
    },
    mode: "onChange",
  });


  useEffect(() => {
    reset({
      name: formData.name || "",
      gender: formData.gender || "",
      age: formData.age || undefined,
    });
  }, [formData, reset]);
 
  useEffect(() => {
    if (triggerValidation) {
      trigger();
      setTriggerValidation(false);
    }
  }, [triggerValidation, trigger, setTriggerValidation]);

  
  const handleSaveData = (data: Partial<FormData>) => {
    setFormData(data); 
    setHasUnsaved(true)
  };

 
  const onSubmit = (data: FormData) => {
    setFormData(data);
    setCurrentStep(1)
    setEdit(false);
    navigate(`/two`);
  };


  return (
    <div className="form-container">
      <h2>Student Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label htmlFor="name" className="form-label">Student Name:</label>
          <input
            {...register("name", { required: "Student name is required" })}
            id="name"
            className="form-input"
            placeholder="Enter your name"
            onChange={(e) => handleSaveData({ name: e.target.value })} 
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>

        <Controller
          name="gender"
          control={control}
          rules={{ required: "Gender is required" }}
          render={({ field }) => (
            <div>
              <label htmlFor="gender" className="form-label">Select Gender:</label>
              <input
                type="radio"
                value="male"
                className="form-radio"
                checked={field.value === "male"}
                onChange={() => {
                  field.onChange("male");
                  handleSaveData({ gender: "male" }); 
                }}
              /> Male
              <input
                type="radio"
                value="female"
                checked={field.value === "female"}
                onChange={() => {
                  field.onChange("female");
                  handleSaveData({ gender: "female" }); 
                }}
              /> Female
            </div>
          )}
        />
        {errors.gender && <span className="error-message">{errors.gender.message}</span>}

        <Controller
          name="age"
          control={control}
          rules={{ required: "Age is required" }}
          render={({ field }) => (
            <div>
              <label htmlFor="age" className="form-label">Age:</label>
              <input
                type="number"
                {...field}
                className="form-input"
                placeholder="Enter your age"
                onChange={(e) => {
                  field.onChange(e.target.value);
                  handleSaveData({ age: parseInt(e.target.value) || 0 });  
                }}
              />
            </div>
          )}
        />
        {errors.age && <span className="error-message">{errors.age.message}</span>}
        <button type="submit" className="form-button" >
          Next
        </button>
      </form>
    </div>
  );
};


export default FormOne;

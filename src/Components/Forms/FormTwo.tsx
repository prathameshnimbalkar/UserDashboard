import React, {useEffect} from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../Helper/FormContext";
import "./Form.css";

interface FormData {
  collegeName: string;
  location: string;
  branch: string;
}

const FormTwo: React.FC = () => {
  const { formData, setFormData,triggerValidation, setTriggerValidation, setCurrentStep } = useFormContext();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger
  } = useForm<FormData>({
    defaultValues: {
      collegeName: formData.collegeName || "",
      location: formData.location || "",
      branch: formData.branch || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (triggerValidation) {
      trigger(); 
      setTriggerValidation(false); 
    }
  }, [triggerValidation, trigger, setTriggerValidation]);

  const handleSaveData = (data: Partial<FormData>) => {
    setFormData(data); 
  };

  const onSubmit = (data: FormData) => {
    setFormData({
      ...formData,
      collegeName: data.collegeName,
      location: data.location,
      branch: data.branch,
    });
    setCurrentStep(2);
    navigate("/three");
    console.log(data);
    
  };

  return (
    <>
      <div className="form-container">
        <h2>Education Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-element">
            <label htmlFor="collegeName" className="form-label">College Name</label>
            <input
              {...register("collegeName", { required: "College name is required" })}
              id="collegeName"
              className="form-input"
              placeholder="Enter College name"
              onChange={(e) => handleSaveData({ collegeName: e.target.value })} 
            />
            {errors.collegeName && (
              <span className="error-message">{errors.collegeName.message}</span>
            )}
          </div>

          <Controller
            name="location"
            control={control}
            rules={{ required: "Please select a location" }}
            render={({ field }) => (
              <div>
                <label htmlFor="location" className="form-label">Select location:</label>
                <input
                  type="radio"
                  value="Pune"
                  className="form-radio"
                  checked={field.value === "Pune"}
                  onChange={() => {
                    field.onChange("Pune");
                    handleSaveData({ location: "Pune" }); 
                  }}
                />{" "}
                Pune
                <input
                  type="radio"
                  value="Mumbai"
                  checked={field.value === "Mumbai"}
                  onChange={() => {
                    field.onChange("Mumbai");
                    handleSaveData({ location: "Mumbai" }); 
                  }}
                />{" "}
                Mumbai
              </div>
            )}
          />
          {errors.location && (
            <span className="error-message">{errors.location.message}</span>
          )}

          <Controller
            name="branch"
            control={control}
            rules={{ required: "Please select Branch" }}
            render={({ field }) => (
              <>
                <label htmlFor="branch" className="form-label">
                  Select Branch:
                </label>
                <select {...field} 
                className="form-select"
                onChange={(e) => {
                  field.onChange(e.target.value);
                  handleSaveData({ branch: e.target.value });
                }}>
                  <option value="">Please Select Branch</option>
                  <option value="CE">CE</option>
                  <option value="ETC">ETC</option>
                  <option value="ME">ME</option>
                </select>
              </>
            )}
          />
          {errors.branch && (
            <span className="error-message">{errors.branch.message}</span>
          )}

          <button type="submit" className="form-button">
            Next
          </button>
        </form>
      </div>
    </>
  );
};


export default FormTwo;

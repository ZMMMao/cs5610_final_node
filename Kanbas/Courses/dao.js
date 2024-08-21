import model from "./model.js";

export const createCourse = (course) => {
    delete course._id;
    return model.create(course);
};

export const findAllCourses = () => model.find();

export const findCourseById = (id) => {
    return model.findById(id);
  };

export const findCourseByNumber = (courseNumber) => 
    model.findOne({ number: courseNumber });

export const updateCourse = (courseId, course) => 
    model.updateOne({ _id: courseId }, { $set: course });

export const deleteCourse = (courseId) => model.deleteOne({_id: courseId});


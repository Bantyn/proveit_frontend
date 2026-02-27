import * as Yup from 'yup';

export const candidateProfileSchema = Yup.object().shape({
    candidateName: Yup.string()
        .min(2, 'Name is too short')
        .required('Name is required'),
    title: Yup.string()
        .required('Professional title is required'),
    bio: Yup.string()
        .min(20, 'Bio should be at least 20 characters to be meaningful')
        .required('Bio is required'),
    experienceLevel: Yup.string()
        .oneOf(['Fresher', 'Junior', 'Mid-Level', 'Senior', 'Lead'])
        .required('Experience level is required'),
    availabilityStatus: Yup.string()
        .required('Availability status is required'),

    skills: Yup.array()
        .of(Yup.object().shape({
            name: Yup.string().required('Skill name is required'),
            level: Yup.string().oneOf(['Beginner', 'Intermediate', 'Advanced', 'Expert']).required('Level is required')
        }))
        .min(1, 'At least one skill is required'),

    githubLink: Yup.string()
        .url('Must be a valid URL')
        .matches(/github\.com/, 'Must be a GitHub URL')
        .required('GitHub profile is required for evaluation'),

    portfolioLink: Yup.string()
        .url('Must be a valid URL'),

    linkedinLink: Yup.string()
        .url('Must be a valid URL'),

    resumeUrl: Yup.string()
        .url('Must be a valid URL')
        .required('A downloadable resume link or upload is mandatory')
});

import { createTailwindMerge } from 'tailwind-merge';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config.js'; 

const fullConfig = resolveConfig(tailwindConfig);

const extractCustomClasses = () => {
  const customClasses = [];
  const extend = fullConfig.theme.extend || {};
  Object.keys(extend).forEach(key => {
    if (typeof extend[key] === 'object') {
      Object.keys(extend[key]).forEach(subKey => {
        customClasses.push(subKey);
      });
    }
  });

  return customClasses;
};

const customClasses = extractCustomClasses();

const customTwMerge = createTailwindMerge({
  classGroups: {
    'custom': customClasses,
  },
  conflictChecker: (classes) => classes.reverse(),
});

export default customTwMerge;

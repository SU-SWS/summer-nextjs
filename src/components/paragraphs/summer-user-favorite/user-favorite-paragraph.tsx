import { HtmlHTMLAttributes} from "react";
import {
  ParagraphSumUserFavorite
} from "@lib/gql/__generated__/drupal.d";
import SummerCourse from "@components/algolia-results/summer-course/summer-course";

const favoriteCourseList = [
  {
    "url": "https://example.com/g76H32uJqR",
    "title": "Race Against the Stars",
    "summary": undefined,
    "photo": "http://summer.lagunita.loc/sites/summer/files/media/image/temp-img_1.jpg",
    "updated": 0,
    "html": "This class introduces the core concepts and methods of Cultural and Social Anthropology. Through the ethnographic study of human societies, anthropology has emerged as a dynamic discipline that inquiries into the complexity of humanity. It has produced new kinds of inquiry into race, class, gender, history, power, language, economy, culture, and local, transnational, and global phenomena. This course will introduce students to anthropology’s unique approach to studying human culture and society and teach them core anthropological concepts. It will also present students with cross-cultural case studies on contemporary issues, including environmental problems and climate change, capitalism, gender and sexuality, race, immigration, and colonialism.",
    "type": "",
    "sum_course_availability": "Available",
    "sum_course_catalog_number": "ASTRO-101",
    "sum_course_class_number": "492",
    "sum_course_course_cost": 7800,
    "sum_course_cross_listing": "ASTRO-100",
    "sum_course_description": "In turpis. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    "sum_course_end_date": "2024-05-17T11:09:28.440Z",
    "sum_course_format": "Hybrid",
    "sum_course_interest": ["Mathematics"],
    "sum_course_length": "Short",
    "sum_course_notes": "Vivamus consectetuer hendrerit lacus. Proin faucibus arcu quis ante. Nunc nonummy metus. Sed hendrerit. Maecenas vestibulum mollis diam.",
    "sum_course_population": ["Graduate", "Part-time"],
    "sum_course_prerequisites": "ASTRO-001",
    "sum_course_schedule": "9:00 - 11:30am Monday, Wednesday, Friday",
    "sum_course_start_date": "2023-08-14T04:33:14.440Z",
    "sum_course_units": 3,
    "sum_students_also_studied": 72
  },
  {
    "url": "https://example.com/f94Z29cVqS",
    "title": "Microbiology: Human Health & Society",
    "summary": undefined,
    "photo": "http://summer.lagunita.loc/sites/summer/files/media/image/temp-img_1.jpg",
    "updated": 0,
    "html": "This class introduces the core concepts and methods of Cultural and Social Anthropology. Through the ethnographic study of human societies, anthropology has emerged as a dynamic discipline that inquiries into the complexity of humanity. It has produced new kinds of inquiry into race, class, gender, history, power, language, economy, culture, and local, transnational, and global phenomena. This course will introduce students to anthropology’s unique approach to studying human culture and society and teach them core anthropological concepts. It will also present students with cross-cultural case studies on contemporary issues, including environmental problems and climate change, capitalism, gender and sexuality, race, immigration, and colonialism.",
    "type": "",
    "sum_course_availability": "Not Available",
    "sum_course_catalog_number": "ASTRO-123",
    "sum_course_class_number": "815",
    "sum_course_course_cost": 4750,
    "sum_course_cross_listing": "ASTRO-101",
    "sum_course_description": "Quisque rutrum. Etiam iaculis nunc ac metus. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Phasellus consectetuer vestibulum elit.",
    "sum_course_end_date": "2023-11-30T05:07:42.015Z",
    "sum_course_format": "Online",
    "sum_course_interest": ["Science"],
    "sum_course_length": "Long",
    "sum_course_notes": "Etiam feugiat lorem non metus. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Sed in libero ut nibh placerat accumsan. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla.",
    "sum_course_population": ["Undergraduate", "Full-time"],
    "sum_course_prerequisites": "ASTRO-001",
    "sum_course_schedule": "9:00 - 11:30am Monday, Wednesday, Friday",
    "sum_course_start_date": "2023-03-12T17:38:42.015Z",
    "sum_course_units": 8,
    "sum_students_also_studied": 58
  }
]


type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumUserFavorite
}

const UserFavoriteParagraph = async ({paragraph, ...props}: Props) => {
  
  return (
    <div>
      <div>
        {/* Favorites List */}
      </div>
      {favoriteCourseList.map((course, i) => <SummerCourse hit={course} key={i} />)}
    </div>
  )
}

export default UserFavoriteParagraph;
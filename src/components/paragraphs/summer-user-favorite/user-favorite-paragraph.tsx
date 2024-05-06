import { HtmlHTMLAttributes} from "react";
import {
  ParagraphSumUserFavorite
} from "@lib/gql/__generated__/drupal.d";
import { H2, H3 } from "@components/elements/headers";
import Wysiwyg from "@components/elements/wysiwyg";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const favoriteCourseList = [
  {
    "id": "bKznYa7VJrv0elPPaZ1ZI3QkgRJyFzfOfX8b",
    "path": "https://example.com/g76H32uJqR",
    "sumCourseAvailability": "Available",
    "sumCourseCatalogNumber": "ASTRO-101",
    "sumCourseClassNumber": 492,
    "sumCourseCourseCost": 7800,
    "sumCourseCrossListing": ["x4Y7zJ9A", "mP1lN3oR"],
    "sumCourseDescription": "In turpis. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    "sumCourseEndDate": "2024-05-17T11:09:28.440Z",
    "sumCourseFormat": "Hybrid",
    "sumCourseImage": {
      "url": "http://summer.lagunita.loc/sites/summer/files/media/image/temp-img_1.jpg",
      "alt": ""
    },
    "sumCourseInstructors": ["5n64D08X5K", "Px2Ng5z68R"],
    "sumCourseInterestArea": "Mathematics",
    "sumCourseLength": "Short",
    "sumCourseNotes": "Vivamus consectetuer hendrerit lacus. Proin faucibus arcu quis ante. Nunc nonummy metus. Sed hendrerit. Maecenas vestibulum mollis diam.",
    "sumCoursePopulation": ["Graduate", "Part-time"],
    "sumCoursePrerequisites": ["ASTRO-001"],
    "sumCourseSchedule": "e4KLfvQNQw1o3a0WmWLaN00b63IXixsNcLdPpGYSZa",
    "sumCourseStartDate": "2023-08-14T04:33:14.440Z",
    "sumCourseSyllabusFile": {
      "url": "https://example.com/syllabus_L6T8h1J6.pdf",
      "name": "syllabus_yeKcGkVp.pdf"
    },
    "sumCourseUniqueImportId": 640,
    "sumCourseUnits": 3,
    "sumStudentsAlsoStudied": 72,
    "title": "Race Against the Stars"
  },
  {
    "id": "dO3RbI6Fov8Na6RpP3nM8U2RkLXtVcTmS6R5",
    "path": "https://example.com/f94Z29cVqS",
    "sumCourseAvailability": "Not Available",
    "sumCourseCatalogNumber": "ANTHRO-123",
    "sumCourseClassNumber": 815,
    "sumCourseCourseCost": 4750,
    "sumCourseCrossListing": ["oW8aE5bT", "qD1fH7jR"],
    "sumCourseDescription": "Quisque rutrum. Etiam iaculis nunc ac metus. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Phasellus consectetuer vestibulum elit.",
    "sumCourseEndDate": "2023-11-30T05:07:42.015Z",
    "sumCourseFormat": "Online",
    "sumCourseImage": {
      "url": "http://summer.lagunita.loc/sites/summer/files/media/image/temp-img_1.jpg",
      "alt": ""
    },
    "sumCourseInstructors": ["VzQfY4mCqL", "YjBrV8yNpW"],
    "sumCourseInterestArea": "Science",
    "sumCourseLength": "Long",
    "sumCourseNotes": "Etiam feugiat lorem non metus. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Sed in libero ut nibh placerat accumsan. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla.",
    "sumCoursePopulation": ["Undergraduate", "Full-time"],
    "sumCoursePrerequisites": ["oW8aE5bT", "qD1fH7jR"],
    "sumCourseSchedule": "m6L6NbGcUgDRirfDoDZF",
    "sumCourseStartDate": "2023-03-12T17:38:42.015Z",
    "sumCourseSyllabusFile": {
      "url": "https://example.com/syllabus_D5F6s3Jv.pdf",
      "name": "syllabus_xN3G6sRc.pdf"
    },
    "sumCourseUniqueImportId": 318,
    "sumCourseUnits": 8,
    "sumStudentsAlsoStudied": 58,
    "title": "Microbiology: Human Health & Society"
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
      <section>
        {favoriteCourseList.map((course) => 
          <article key={course.id} className="rounded-[25px] bg-fog-light rs-py-3 rs-px-4 rs-mb-4">
            <div className="flex flex-row justify-between rs-mb-1">
              <div className="flex flex-row items-center"><CheckCircleIcon width={20} className="text-digital-green mr-2" />{course.sumCourseAvailability.toUpperCase()}</div>
              <div>Favorite Icon Here</div>
            </div>
            <div className="flex flex-row rs-mb-3">
            {course.sumCourseImage && 
              <div className="relative aspect-1/1 w-full h-[200px] md:w-[500px] md:h-[500px] *:rounded-[25px]">
                <Image
                  className="object-cover"
                  src={course.sumCourseImage.url}
                  alt={course.sumCourseImage.alt || ""}
                  fill
                  sizes="100vw"
                  />
              </div>
            }
            <div>
              <div>{course.sumCourseCatalogNumber}</div>
              <H2>{course.title}</H2>
            </div>
            <div>
              {course.sumCourseUnits && <div><span>Units: </span>{course.sumCourseUnits}</div>}
              {course.sumCourseCourseCost && <div><span>Course cost: </span>{course.sumCourseCourseCost}</div>}
              {course.sumCoursePopulation &&
                <div>
                  <span>Population: </span>
                  {course.sumCoursePopulation.map((population, i) => <p className="inline-block mb-0" key={`population-${i}`}>
                    {population}{course.sumCoursePopulation && course.sumCoursePopulation.length > 1 && i !== course.sumCoursePopulation.length - 1 && ", "}
                  </p>
                  )}
                </div>
              }
              </div>
            </div>
            
            <button>Show all details</button>
            {/* Show/Hide */}
            <div className="flex flex-row rs-mt-2">
              <div>
                {course.sumCourseDescription &&
                  <div className="rs-mb-1"><H3 className="text-m1 mb-5">Summary:</H3><Wysiwyg html={course.sumCourseDescription} /></div>
                }
                {course.sumCourseNotes &&
                  <><H3 className="text-m1 mb-5">Course notes:</H3><Wysiwyg html={course.sumCourseNotes} /></>
                }
              </div>
              <div>
                <H3 className="text-m1 ">Details:</H3>
                {course.sumCourseInterestArea && <div><span>Interest Area:</span> {course.sumCourseInterestArea}</div>}
                {course.sumCourseSchedule && <div><span>Time:</span> {course.sumCourseSchedule}</div>}
                {course.sumCourseUnits && <div><span>Units:</span> {course.sumCourseUnits}</div>}
                {course.sumCourseFormat && <div><span>Format: </span>{course.sumCourseFormat}</div>}
                {course.sumCourseLength && <div><span>Course length:</span>{course.sumCourseLength}</div>}

                {course.sumCoursePrerequisites && (
                  <div>
                    <span>Cross Listings: </span>
                    {course.sumCoursePrerequisites && course.sumCoursePrerequisites.length > 1 ? course.sumCoursePrerequisites.join(", ") : course.sumCoursePrerequisites[0]}
                  </div>
                )}

                {course.sumCourseCrossListing && (
                  <div>
                    <span>Cross Listings: </span>
                    {course.sumCourseCrossListing && course.sumCourseCrossListing.length > 1 ? course.sumCourseCrossListing.join(", ") : course.sumCourseCrossListing[0]}
                  </div>
                )}
              </div>
            </div>
          </article>
        )}
      </section>
    </div>
  )
}

export default UserFavoriteParagraph;
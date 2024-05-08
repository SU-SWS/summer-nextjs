import {HtmlHTMLAttributes} from "react";
import {ParagraphSumCalculator} from "@lib/gql/__generated__/drupal.d";
import SumCalculator from "@components/paragraphs/sum-calculator/sum-calculator";
import Wysiwyg from "@components/elements/wysiwyg";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumCalculator
}

const SumCalculatorParagraph = ({paragraph, ...props}: Props) => {

  const costPerStudentType = new Map<string, Map<number, number>>();
  costPerStudentType.set("undergraduate", new Map(paragraph.sumCalcUgUnitCost.map(cost => [cost.first as number, cost.second as number])))
  costPerStudentType.set("highschool", new Map(paragraph.sumCalcHighUnitCost.map(cost => [cost.first as number, cost.second as number])))
  costPerStudentType.set("graduate", new Map(paragraph.sumCalcGradUnitCost.map(cost => [cost.first as number, cost.second as number])))

  const progCosts = new Map(paragraph.sumCalcProgFee.map(item => [item.first as string, item.second as number]));
  const housingCosts = new Map(paragraph.sumCalcHouseFees.map(item => [item.first as string, item.second as number]));

  return (
    <SumCalculator
      costPerStudentTypes={costPerStudentType}
      appCost={paragraph.sumCalcAppFee}
      progCosts={progCosts}
      i20Cost={paragraph.sumCalcI20Fee}
      housingCosts={housingCosts}
      mealPlanCost={paragraph.sumCalcMeals}
      techCost={paragraph.sumCalcTechFee}
      mailCost={paragraph.sumCalcMailFee}
      insuranceCost={paragraph.sumCalcInsurance}
      booksSuppliesCost={paragraph.sumCalcBooks}
      healthServiceCost={paragraph.sumCalcHealthFee}
      documentsCost={paragraph.sumCalcDocuments}
      commuterHelp={<Wysiwyg html={paragraph.sumCalcCommuteHelp?.processed}/>}
      graduateApplicationHelp={<Wysiwyg html={paragraph.sumCalcGradAppHelp?.processed}/>}
      graduateUnitsHelp={<Wysiwyg html={paragraph.sumCalcGradUnitHelp?.processed}/>}
      highSchoolAppHelp={<Wysiwyg html={paragraph.sumCalcHighAppHelp?.processed}/>}
      highSchoolUnitHelp={<Wysiwyg html={paragraph.sumCalcHighUnitHelp?.processed}/>}
      onCampusHousingHelp={<Wysiwyg html={paragraph.sumCalcHouseHelp?.processed}/>}
      i20Help={<Wysiwyg html={paragraph.sumCalcI20Help?.processed}/>}
      insuranceHelp={<Wysiwyg html={paragraph.sumCalcInsHelp?.processed}/>}
      wavedInsuranceHelp={<Wysiwyg html={paragraph.sumCalcInsWaveHelp?.processed}/>}
      undergradAppHelp={<Wysiwyg html={paragraph.sumCalcUgAppHelp?.processed}/>}
      undergradUnitsHelp={<Wysiwyg html={paragraph.sumCalcUgUnitHelp?.processed}/>}
      {...props}
    />
  )
}
export default SumCalculatorParagraph
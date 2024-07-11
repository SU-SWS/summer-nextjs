"use client"

import {HtmlHTMLAttributes, useState, JSX, useRef} from "react"
import SelectList from "@components/elements/select-list"
import {H2, H3} from "@components/elements/headers"
import {formatCurrency} from "@lib/utils/format-currency"
import useAccordion from "@lib/hooks/useAccordion"
import {clsx} from "clsx"
import {ChevronDownIcon} from "@heroicons/react/20/solid"
import useOutsideClick from "@lib/hooks/useOutsideClick"
import {twMerge} from "tailwind-merge"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  costPerStudentTypes: Map<string, Map<number, number>>
  appCost: number
  progCosts: Map<string, number>
  i20Cost: number
  housingCosts: Map<string, number>
  mealPlanCost: number
  techCost: number
  mailCost: number
  insuranceCost: number
  booksSuppliesCost: number
  healthServiceCost: number
  documentsCost: number
  commuterHelp?: JSX.Element | string
  graduateApplicationHelp?: JSX.Element | string
  graduateUnitsHelp?: JSX.Element | string
  highSchoolAppHelp?: JSX.Element | string
  highSchoolUnitHelp?: JSX.Element | string
  onCampusHousingHelp?: JSX.Element | string
  i20Help?: JSX.Element | string
  insuranceHelp?: JSX.Element | string
  wavedInsuranceHelp?: JSX.Element | string
  undergradAppHelp?: JSX.Element | string
  undergradUnitsHelp?: JSX.Element | string
}

const SumCalculatorParagraph = ({costPerStudentTypes, appCost, progCosts, i20Cost, housingCosts, mealPlanCost, techCost, mailCost, insuranceCost, booksSuppliesCost, healthServiceCost, documentsCost, commuterHelp, graduateApplicationHelp, graduateUnitsHelp, highSchoolAppHelp, highSchoolUnitHelp, onCampusHousingHelp, i20Help, insuranceHelp, wavedInsuranceHelp, undergradAppHelp, undergradUnitsHelp, ...props}: Props) => {
  const [studentType, setStudentType] = useState<"highschool" | "graduate" | "undergraduate" | "">("")
  const [needsI20, setNeedsI20] = useState<boolean | undefined>()
  const [onCampus, setOnCampus] = useState<boolean | undefined>()
  const [waivingInsurance, setWaivingInsurance] = useState<boolean | undefined>()
  const [units, setUnits] = useState<number>(0)

  const {buttonProps, panelProps, expanded, toggleExpanded} = useAccordion()

  const summaryRef = useRef<HTMLDivElement>(null)
  useOutsideClick(summaryRef, () => expanded && toggleExpanded())

  const appFee = studentType ? appCost : 0
  const progFee = progCosts.get(studentType) || 0
  const i20Fee = needsI20 ? i20Cost : 0
  const housingFee = onCampus ? housingCosts.get(studentType) || 0 : 0
  const mealPlan = onCampus ? mealPlanCost : 0
  const techFee = onCampus ? techCost : 0
  const mailFee = onCampus ? mailCost : 0
  const insurance = waivingInsurance ? 0 : insuranceCost

  const unitsCost = costPerStudentTypes.get(studentType)?.get(units) || 0

  const totalCost = !studentType ? 0 : appFee + progFee + i20Fee + housingFee + mealPlan + techFee + mailFee + insurance + unitsCost + booksSuppliesCost + healthServiceCost + documentsCost
  const unitOptions: {value: string; label: string}[] = []

  for (let i = 3; i <= 20; i++) {
    unitOptions.push({value: `${i}`, label: `${i}`})
  }

  const onSelectFocus = () => {
    // When tabbing through the items, if tab end up behind the sticky summary, scroll the window enough to view the
    // tabbed element.
    if (document.activeElement && summaryRef.current) {
      const {y: activeY, height: activeH} = document.activeElement.getBoundingClientRect()
      const {y: summaryY} = summaryRef.current.getBoundingClientRect()

      const positionDifference = summaryY - activeY - activeH
      if (positionDifference < 0) {
        window.scrollTo({top: window.scrollY - positionDifference + 1})
      }
    }
  }

  return (
    <div
      {...props}
      className={twMerge("centered", props.className)}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-20 pb-72">
        <div onFocus={onSelectFocus}>
          <div
            className="rs-mb-1 type-3 block"
            id="sum-student-type"
          >
            Tell us who you are
          </div>
          <SelectList
            ariaLabelledby="sum-student-type"
            placeholder="Pick a level"
            options={[
              {value: "undergraduate", label: "I am an Undergraduate student"},
              {value: "highschool", label: "I am a High School student"},
              {value: "graduate", label: "I am a Graduate student"},
            ]}
            downIcon={
              <ChevronDownIcon
                width={50}
                className="rounded-full bg-digital-red text-white"
              />
            }
            onChange={(_e, value) => setStudentType(value as "highschool" | "graduate" | "undergraduate")}
            required
          />

          {studentType === "undergraduate" && undergradAppHelp}
          {studentType === "graduate" && graduateApplicationHelp}
          {studentType === "highschool" && highSchoolAppHelp}
        </div>

        <div onFocus={onSelectFocus}>
          <div
            className="rs-mb-1 type-3 block"
            id="sum-international-student"
          >
            Are you an international student that requires a Stanford issued I-20?
          </div>
          <SelectList
            ariaLabelledby="sum-international-student"
            placeholder="Choose an option"
            options={[
              {value: "yes", label: "Yes, I am an international student requiring a Stanford Sponsored I-20"},
              {value: "no1", label: "No, I am a US citizen or permanent US resident"},
              {value: "no2", label: "No, I am an international student with an I-20 sponsored by another institution"},
            ]}
            downIcon={
              <ChevronDownIcon
                width={50}
                className="ml-auto flex-shrink-0 rounded-full bg-digital-red text-white"
              />
            }
            onChange={(_e, value) => setNeedsI20(value === "yes")}
            disabled={!studentType}
            required
          />

          {needsI20 === true && i20Help}
        </div>

        <div onFocus={onSelectFocus}>
          <div
            className="rs-mb-1 type-3 block"
            id="sum-campus-status"
          >
            Will you be living on campus?
          </div>
          <SelectList
            ariaLabelledby="sum-campus-status"
            placeholder="Choose housing preference"
            options={[
              {value: "yes", label: "On-Campus"},
              {value: "no", label: "Living off campus and commuting"},
            ]}
            downIcon={
              <ChevronDownIcon
                width={50}
                className="rounded-full bg-digital-red text-white"
              />
            }
            onChange={(_e, value) => setOnCampus(value === "yes")}
            disabled={needsI20 === undefined}
            required
          />

          {onCampus && onCampusHousingHelp}
          {onCampus === false && commuterHelp}
        </div>

        <div onFocus={onSelectFocus}>
          <div
            className="rs-mb-1 type-3 block"
            id="sum-units"
          >
            How many units will you be taking?
          </div>
          <SelectList
            ariaLabelledby="sum-units"
            placeholder="Select the number of units"
            options={unitOptions}
            downIcon={
              <ChevronDownIcon
                width={50}
                className="rounded-full bg-digital-red text-white"
              />
            }
            onChange={(_e, value) => setUnits(parseInt(value as string))}
            disabled={onCampus === undefined}
            required
          />

          {studentType === "undergraduate" && units > 0 && undergradUnitsHelp}
          {studentType === "graduate" && units > 0 && graduateUnitsHelp}
          {studentType === "highschool" && units > 0 && highSchoolUnitHelp}
        </div>

        <div onFocus={onSelectFocus}>
          <div
            className="rs-mb-1 type-3 block"
            id="sum-cardinal-care"
          >
            Will you be waiving Cardinal Care Health Insurance?
          </div>
          <SelectList
            ariaLabelledby="sum-cardinal-care"
            placeholder="Choose an option"
            options={[
              {value: "yes", label: "Yes, I will be waiving Cardinal Care."},
              {value: "no", label: "No, I would like to stay enrolled in Cardinal Care Health Insurance"},
            ]}
            downIcon={
              <ChevronDownIcon
                width={50}
                className="rounded-full bg-digital-red text-white"
              />
            }
            onChange={(_e, value) => setWaivingInsurance(value === "yes")}
            disabled={units < 3}
            required
          />

          {waivingInsurance && wavedInsuranceHelp}
          {waivingInsurance === false && insuranceHelp}
        </div>
      </div>

      <div className="sticky bottom-0">
        <div
          ref={summaryRef}
          className="relative left-1/2 max-h-screen w-screen -translate-x-1/2 overflow-x-hidden overflow-y-scroll border-t-2 bg-fog-light"
        >
          <div className="pb-12 md:pt-20">
            <div className="centered flex flex-col lg:mx-auto lg:max-w-7xl">
              <div className="block md:hidden">
                <button
                  {...buttonProps}
                  className="m-auto mb-3 block text-archway-dark"
                >
                  <span className="flex items-center text-m1">
                    <span className="sr-only">{expanded ? "Close" : "See"} details</span>
                    <ChevronDownIcon
                      width={33}
                      className={clsx("rotate-180 transition duration-150", {"rotate-0": expanded})}
                    />
                  </span>
                </button>
              </div>
              <div className="order-1">
                <H2
                  className="flex justify-between text-m1 lg:text-m3 lg:font-normal"
                  aria-live="polite"
                  aria-atomic
                >
                  <span>Estimated total cost</span>
                  <span>{formatCurrency(totalCost)}</span>
                </H2>
                <p className="card-paragraph mb-0 hidden text-left md:block">* Disclaimer: this is only an estimate. Actual fees are subject to change.</p>
              </div>

              <div
                {...panelProps}
                className={clsx("order-3 children:mt-12", {hidden: !expanded})}
              >
                <p className="card-paragraph mb-0 block border-b border-black pb-4 text-left md:hidden">* Disclaimer: this is only an estimate. Actual fees are subject to change.</p>
                {!!units && (
                  <div>
                    <div className="flex items-baseline gap-5">
                      <H3 className="text-m0">Tuition</H3>(Based on the total number of units)
                    </div>
                    <SummaryCost
                      label={`${units} Units`}
                      cost={unitsCost}
                    />
                  </div>
                )}

                {studentType && (
                  <div>
                    <H3 className="text-m0">General Fees</H3>
                    <SummaryCost
                      label="Application Fee"
                      cost={appFee}
                    />
                    <SummaryCost
                      label="Program Fee"
                      cost={progFee}
                    />
                    <SummaryCost
                      label="Campus Health Services Fee"
                      cost={healthServiceCost}
                    />
                    {needsI20 && (
                      <SummaryCost
                        label="I-20 Processing Fee"
                        cost={i20Fee}
                      />
                    )}
                  </div>
                )}

                {onCampus && (
                  <div>
                    <H3 className="text-m0">On-campus Fees</H3>
                    <SummaryCost
                      label="Housing Fee"
                      cost={housingFee}
                    />
                    <SummaryCost
                      label="Meal Plan"
                      cost={mealPlan}
                    />
                    <SummaryCost
                      label="Mail Service Fee"
                      cost={mailFee}
                    />
                    <SummaryCost
                      label="Technology Fee "
                      cost={techFee}
                    />
                  </div>
                )}

                <div>
                  <H3 className="text-m0">Extra Fees</H3>
                  <SummaryCost
                    label="Books and Supplies (optional)"
                    cost={booksSuppliesCost}
                  />
                  <SummaryCost
                    label="Document Fee"
                    cost={documentsCost}
                  />
                  {!waivingInsurance && (
                    <SummaryCost
                      label="Cardinal Care Health Insurance optional"
                      cost={insurance}
                    />
                  )}
                </div>
              </div>

              <div className="order-2 mt-20 hidden border-b border-black md:block">
                <button
                  {...buttonProps}
                  className="mb-3 ml-auto block text-digital-blue"
                >
                  <span className="flex items-center text-m1">
                    {expanded ? "Close" : "See"} details
                    <ChevronDownIcon
                      width={33}
                      className={clsx("transition duration-150", {"rotate-180": expanded})}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SummaryCost = ({label, cost}: {label: string; cost: number}) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <span>{label}</span>
      <span>{formatCurrency(cost)}</span>
    </div>
  )
}

export default SumCalculatorParagraph

"use client";

import {HtmlHTMLAttributes, useId, useState} from "react";
import SelectList from "@components/elements/select-list";
import {H2, H3} from "@components/elements/headers";
import {useBoolean, useCounter} from "usehooks-ts";
import {formatCurrency} from "@lib/utils/format-currency";
import useAccordion from "@lib/hooks/useAccordion";
import {clsx} from "clsx";
import {ChevronDownIcon} from "@heroicons/react/20/solid";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  costPerStudentTypes: Map<string, Map<number, number>>
  appCosts: Map<string, number>
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
}

const SumCalculatorParagraph = ({
  costPerStudentTypes,
  appCosts,
  progCosts,
  i20Cost,
  housingCosts,
  mealPlanCost,
  techCost,
  mailCost,
  insuranceCost,
  booksSuppliesCost,
  healthServiceCost,
  documentsCost,
  ...props
}: Props) => {
  const id = useId();

  const [studentType, setStudentType] = useState("")
  const {value: needsI20, setValue: setNeedsI20} = useBoolean(false)
  const {value: onCampus, setValue: setOnCampus} = useBoolean(false)
  const {count: units, setCount: setUnits} = useCounter(0)
  const {value: waivingInsurance, setValue: setWaivingInsurance} = useBoolean(true)

  const {buttonProps, panelProps, expanded} = useAccordion();

  const appFee = appCosts.get(studentType) || 0
  const progFee = progCosts.get(studentType) || 0
  const i20Fee = needsI20 ? i20Cost : 0
  const housingFee = onCampus ? housingCosts.get(studentType) || 0 : 0
  const mealPlan = onCampus ? mealPlanCost : 0
  const techFee = onCampus ? techCost : 0
  const mailFee = onCampus ? mailCost : 0
  const insurance = waivingInsurance ? 0 : insuranceCost

  const unitsCost = costPerStudentTypes.get(studentType)?.get(units) || 0

  const totalCost = appFee + progFee + i20Fee + housingFee + mealPlan + techFee + mailFee + insurance + unitsCost + booksSuppliesCost + healthServiceCost + documentsCost;
  const unitOptions: { value: string, label: string }[] = [];

  for (let i = 3; i <= 20; i++) {
    unitOptions.push({value: `${i}`, label: `${i}`})
  }

  return (
    <div {...props}>
      <div className="max-w-7xl mx-auto pb-72">
        <div>
          <div id={`${id}-type`}>I am a/an _________ student</div>

          <SelectList
            ariaLabelledby={`${id}-type`}
            options={[
              {value: "undergraduate", label: "Undergraduate"},
              {value: "highschool", label: "High School"},
              {value: "graduate", label: "Graduate"}
            ]}
            onChange={(_e, value) => setStudentType(value as string)}
            required
          />
        </div>

        <div>
          <div id={`${id}-i20`}>Are you an international student that requires a Stanford issued I-20?</div>

          <SelectList
            ariaLabelledby={`${id}-i20`}
            options={[
              {value: "yes", label: "Yes, I am an international student requiring a Stanford Sponsored I-20"},
              {value: "no1", label: "No, I am a US citizen or permanent US resident"},
              {value: "no2", label: "No, I am an international student with an I-20 sponsored by another institution"}
            ]}
            onChange={(_e, value) => setNeedsI20(value === "yes")}
            required
            disabled={!studentType}
          />
        </div>

        <div>
          <div id={`${id}-housing`}>Will you be living on campus?</div>
          <SelectList
            ariaLabelledby={`${id}-housing`}
            options={[
              {value: "yes", label: "On-Campus"},
              {value: "no", label: "Living off campus and commuting"},
            ]}
            onChange={(_e, value) => setOnCampus(value === "yes")}
            required
            disabled={!studentType}
          />
        </div>

        <div>
          <div id={`${id}-units`}>How many units will you be taking?</div>

          <SelectList
            ariaLabelledby={`${id}-units`}
            options={unitOptions}
            onChange={(_e, value) => setUnits(parseInt(value as string))}
            required
            disabled={!studentType}
          />
        </div>

        <div>
          <div id={`${id}-insurance`}>Will you be waiving Cardinal Care Health Insurance?</div>

          <SelectList
            ariaLabelledby={`${id}-insurance`}
            options={[
              {value: "yes", label: "Yes, I will be waiving Cardinal Care."},
              {value: "no", label: "No, I would like to stay enrolled in Cardinal Care Health Insurance"},
            ]}
            onChange={(_e, value) => setWaivingInsurance(value === "yes")}
            required
            disabled={!studentType}
          />

        </div>
      </div>

      <div className="absolute bottom-0 bg-black-10 w-screen left-1/2 -translate-x-1/2">
        <div className="max-w-7xl mx-auto">
          <H2 className="flex justify-between" aria-live="polite" aria-atomic>
            <span>Estimated total cost</span>
            <span>{formatCurrency(totalCost)}</span>
          </H2>
          <p className="text-left">* Disclaimer: this is only an estimate. Actual fees are subject to change.</p>

          <div {...panelProps} className={clsx({"hidden": !expanded})}>


            {!!units &&
              <div>
                <div className="flex items-baseline gap-5"><H3>Tuition</H3>(Based on the total number of units)</div>
                <SummaryCost label={`${units} Units`} cost={unitsCost}/>
              </div>
            }

            {studentType &&
              <div>
                <H3>General Fees</H3>
                <SummaryCost label="Application Fee" cost={appFee}/>
                <SummaryCost label="Program Fee" cost={progFee}/>
                <SummaryCost label="Campus Health Services Fee" cost={healthServiceCost}/>
                {needsI20 &&
                  <SummaryCost label="I-20 Processing Fee" cost={i20Fee}/>
                }
              </div>
            }

            {onCampus &&
              <div>
                <H3>On-campus Fees</H3>
                <SummaryCost label="Housing Fee" cost={housingFee}/>
                <SummaryCost label="Meal Plan" cost={mealPlan}/>
                <SummaryCost label="Mail Service Fee" cost={mailFee}/>
                <SummaryCost label="Technology Fee " cost={techFee}/>
              </div>
            }


            <div>
              <H3>Extra Fees</H3>
              <SummaryCost label="Books and Supplies (optional)" cost={booksSuppliesCost}/>
              <SummaryCost label="Document Fee" cost={documentsCost}/>
              {!waivingInsurance &&
                <SummaryCost label="Cardinal Care Health Insurance optional" cost={insurance}/>
              }
            </div>

            <div>
              <p className="text-m4 flex justify-between">
                <span>Estimated total cost</span> <span>{formatCurrency(totalCost)}</span>
              </p>

              <p className="text-left">* Disclaimer: this is only an estimate. Actual fees are subject to change.</p>
            </div>
          </div>

          <button {...buttonProps} className="block ml-auto">
          <span className="flex items-center">
            {expanded ? "Close" : "See"} details
            <ChevronDownIcon width={20} className={clsx("transition duration-150", {"rotate-180": expanded})}/>
          </span>
          </button>
        </div>
      </div>
    </div>
  )
}

const SummaryCost = ({label, cost}: { label: string, cost: number }) => {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span><span>{formatCurrency(cost)}</span>
    </div>
  )
}

export default SumCalculatorParagraph
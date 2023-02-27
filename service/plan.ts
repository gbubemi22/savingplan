import { PlanDataType } from '../helpers/types';
import { fnResponse } from '../helpers/utility';
import DB from '../controllers/db';


export class Plan{

     public async create({ ...PlanDataType}: PlanDataType) {
          try {
               const plan = await DB.plans.create({
                    userId: PlanDataType.userId,
                    title: PlanDataType.title,
                    people_to_save_with: PlanDataType.people_to_save_with,
                    target: PlanDataType.target,
                    auto_save: PlanDataType.auto_save,
                    saving_frequency: PlanDataType.saving_frequency,
                    start: PlanDataType.start,
                    amount_to_save: PlanDataType.amount_to_save,
                    when_to_start_saving: PlanDataType.when_to_start_saving,
                    period_of_saving: PlanDataType.period_of_saving,
                    start_date: PlanDataType.start_date,
                    end_date: PlanDataType.end_date,
                    relation_type: PlanDataType.relation_type,

               })
               return fnResponse({ status: true, message: 'Plan created successfully', data: plan });
          } catch (error) {
             return fnResponse({ status: false, message:`An error occurred - ${error}`  })
          }
     }

     
}



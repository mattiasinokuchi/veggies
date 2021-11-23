/*  This module contains endpoints to the
    database for the customers parent page   */

import { pool } from '$lib/db';

//  Reads all active customers phone numbers
export const get = async (_) => {
    const res = await pool.query(`
        SELECT telephone
        FROM customer_table
        WHERE
            -- subscription is activated
            active = 'true'
        AND
            -- no time-out today
            id
            NOT IN(
                SELECT id
                FROM time_out_table
                WHERE CURRENT_DATE BETWEEN start_time::date AND end_time)
        `);
    console.log(res.rows);
    let str = '';
    for (let index = 0; index < res.rows.length; index++) {
        str += res.rows[index].telephone + ',';
    }
    phone_numbers = str.slice(0,-1);
    return {
        body: [{ numbers: phone_numbers }]
    };
};

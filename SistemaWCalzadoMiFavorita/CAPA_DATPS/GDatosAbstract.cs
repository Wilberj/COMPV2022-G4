using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using System.Data.SqlClient;

namespace CAPA_DATOS
{
    public abstract class GDatosAbstract
    {
        /* Metodos correspondiente al consumo de informacion ADO NET*/
        protected IDbConnection SQLMCon;
        protected IDbTransaction MTransaccion;
        protected bool EnTransaccion;
        protected abstract IDbConnection CrearConexion(string cadena);
        protected abstract IDbCommand ComandoSql(string comandoSql, IDbConnection connection);
        protected abstract IDataAdapter CrearDataAdapterSql(string comandoSql, IDbConnection connection);
        protected abstract IDataAdapter CrearDataAdapterSql(IDbCommand comandoSql);

        protected abstract List<EntityProps> DescribeEntity(string entityName);
        protected abstract private DataTable BuildTable(object Inst, ref string CondSQL);
        protected abstract string BuildInsertQueryByObject(object Inst);
        protected abstract string BuildUpdateQueryByObject(object Inst, string IdObject);
        protected abstract string BuildUpdateQueryByObject(object Inst, string[] WhereProps);
        protected abstract string BuildDeleteQuery(object Inst);
        public object ExecuteSqlQuery(string strQuery)
        {
            //SQLMCon.Open()
            var con = ComandoSql(strQuery, SQLMCon);
            var scalar = con.ExecuteScalar();
            SQLMCon.Close();
            if (scalar == (object)DBNull.Value) return true;
            else return Convert.ToInt32(scalar);
        }
        public Object InsertObject(Object Inst)
        {
            try
            {
                SQLMCon.Open();
                string strQuery = BuildInsertQueryByObject(Inst);
                return ExecuteSqlQuery(strQuery);
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }
        public Object UpdateObject(Object Inst, string[] whereParams)
        {
            try
            {
                SQLMCon.Open();
                string strQuery = BuildUpdateQueryByObject(Inst, whereParams);
                return ExecuteSqlQuery(strQuery);
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }
        public Object UpdateObject(Object Inst, string whereParam)
        {
            try
            {
                SQLMCon.Open();
                string strQuery = BuildUpdateQueryByObject(Inst, whereParam);
                return ExecuteSqlQuery(strQuery);
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }
        public Object Delete(Object Inst)
        {
            try
            {
                SQLMCon.Open();
                string strQuery = BuildDeleteQuery(Inst);
                return ExecuteSqlQuery(strQuery);
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }


        }
        public DataTable TraerDatosSQL(string queryString)
        {
            DataSet ObjDS = new DataSet();
            CrearDataAdapterSql(queryString, SQLMCon).Fill(ObjDS);
            return ObjDS.Tables[0].Copy();
        }

        public DataTable TraerDatosSQL(IDbCommand Command)
        {
            DataSet ObjDS = new DataSet();
            CrearDataAdapterSql(Command).Fill(ObjDS);
            return ObjDS.Tables[0].Copy();
        }

        //public Object TakeListWithProcedure(string ProcedureName, Object Inst, List<Object> Params)
        //{
        //    try
        //    {
        //        SQLMCon.Open();
        //        var Command = ComandoSql(ProcedureName, SQLMCon);
        //        Command.CommandType = CommandType.StoredProcedure;
        //        SqlCommandBuilder.DeriveParameters((SqlCommand)Command);
        //        SQLMCon.Close();
        //        if (Params.Count != 0)
        //        {
        //            int i = 0;
        //            foreach (var param in Params)
        //            {
        //                var p = (SqlParameter)Command.Parameters[i + 1];
        //                p.Value = param;
        //                i++;
        //            }
        //        }
        //        DataTable Table = TraerDatosSQL(Command);
        //        List<Object> ListD = ConvertDataTable(Table, Inst);
        //        return ListD;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}
        public List<T> TakeListWithProcedure<T>(string ProcedureName, Object Inst, List<Object> Params)
        {
            try
            {
                SQLMCon.Open();
                var Command = ComandoSql(ProcedureName, SQLMCon);
                Command.CommandType = CommandType.StoredProcedure;
                SqlCommandBuilder.DeriveParameters((SqlCommand)Command);
                SQLMCon.Close();
                if (Params.Count != 0)
                {
                    int i = 0;
                    foreach (var param in Params)
                    {
                        var p = (SqlParameter)Command.Parameters[i + 1];
                        p.Value = param;
                        i++;
                    }
                }
                DataTable Table = TraerDatosSQL(Command);
                List<T> ListD = ConvertDataTable<T>(Table, Inst);
                return ListD;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<T> TakeList<T>(Object Inst, string CondSQL = "")
        {
            try
            {
                DataTable Table = BuildTable(Inst, ref CondSQL);
                List<T> ListD = ConvertDataTable<T>(Table, Inst);
                return ListD;
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }
        public T TakeObject<T>(Object Inst, string CondSQL = "")
        {
            try
            {
                DataTable Table = BuildTable(Inst, ref CondSQL);
                List<T> ListD = ConvertDataTable<T>(Table, Inst);
                return ListD[0];
            }
            catch (Exception)
            {
                SQLMCon.Close();
                throw;
            }
        }
        private static List<Object> ConvertDataTable(DataTable dt, Object Inst)
        {
            List<Object> data = new List<Object>();
            foreach (DataRow row in dt.Rows)
            {
                var item = GetItem(row, Inst);
                data.Add(item);
            }
            return data;
        }
        private static Object GetItem(DataRow dr, Object Inst)
        {
            Type temp = Inst.GetType();
            var obj = Activator.CreateInstance(Inst.GetType());
            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }
        protected List<T> ConvertDataTable<T>(DataTable dt, Object Inst)
        {
            List<T> data = new List<T>();
            foreach (DataRow dr in dt.Rows)
            {
                T obj = ConvertRow<T>(Inst, dr);
                data.Add(obj);
            }
            return data;
        }
        private static T ConvertRow<T>(object Inst, DataRow dr)
        {
            var obj = Activator.CreateInstance<T>();
            Type temp = Inst.GetType();
            foreach (DataColumn column in dr.Table.Columns)
            {
                if (!string.IsNullOrEmpty(dr[column.ColumnName].ToString()))
                {
                    foreach (PropertyInfo pro in temp.GetProperties())
                    {
                        if (pro.Name == column.ColumnName)
                        {
                            pro.SetValue(obj, GetValue(dr[column.ColumnName], pro.PropertyType));

                        }
                        else continue;
                    }

                }
                else continue;

            }
            return obj;
        }
        private static Object GetValue(Object DefaultValue, Type type)
        {
            string Literal = DefaultValue.ToString();
            if (Literal == null || Literal == "" || Literal == string.Empty) return DefaultValue;
            IConvertible obj = Literal;
            Type u = Nullable.GetUnderlyingType(type);
            if (u != null)
            {
                return (obj == null) ? DefaultValue : Convert.ChangeType(obj, u);
            }
            else
            {
                return Convert.ChangeType(obj, type);
            }
        }


    }
}

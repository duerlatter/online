package com.xczhihui.barrier.service;

import java.util.List;
import java.util.Map;

import com.xczhihui.barrier.vo.MarkBarrierVo;
import com.xczhihui.barrier.vo.MarkGradeVo;
import com.xczhihui.barrier.vo.MarkRecordVo;
import com.xczhihui.common.util.bean.Page;
import com.xczhihui.course.vo.CourseVo;

/**
 * @Author Fudong.Sun【】
 * @Date 2016/12/22 10:45
 */
public interface MarkExamPapersService {
    /**
     * 查询课程列表
     *
     * @return
     */
    public List<CourseVo> findCourses();

    /**
     * 获取全部班级信息
     *
     * @param
     * @return
     */
    public Page<MarkGradeVo> findGradeList(MarkGradeVo gradeVo,
                                           Integer pageNumber, Integer pageSize);

    /**
     * 获取班级下关卡列表
     *
     * @param pageNumber
     * @param pageSize
     * @return
     */
    public Page<MarkBarrierVo> findbarriers(Integer grade_id,
                                            Integer pageNumber, Integer pageSize);

    /**
     * 获取关卡下学员闯关记录
     *
     * @param barrier_id
     * @param pageNumber
     * @param pageSize
     * @return
     */
    public Page<MarkRecordVo> findBarrierRecord(Integer barrier_status,
                                                String user_name, Integer grade_id, String barrier_id,
                                                Integer pageNumber, Integer pageSize);

    /**
     * 根据学员、关卡查询闯关次数
     *
     * @param user_id
     * @param barrier_id
     * @return
     */
    public List<Map<String, Object>> getExamNum(String user_id,
                                                String barrier_id);

    /**
     * 根据闯关记录查询闯关试卷
     *
     * @param record_id
     * @return
     */
    public Map<String, Object> getExamPaper(String record_id);
}
